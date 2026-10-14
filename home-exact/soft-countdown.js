/** Dependency-free countdown. endTime: Unix milliseconds, Date, or ISO string with timezone. */
export function createSoftCountdown(root, {
  endTime,
  duration = 650,
  labels = ['HOURS', 'MINUTES', 'SECONDS'],
  onComplete,
} = {}) {
  if (!(root instanceof HTMLElement)) throw new TypeError('A container element is required.');
  const deadline = endTime instanceof Date ? endTime.getTime()
    : typeof endTime === 'number' ? endTime : Date.parse(endTime);
  if (!Number.isFinite(deadline)) throw new TypeError('endTime must be a valid date or Unix milliseconds.');
  if (!Number.isFinite(duration) || duration < 0 || duration > 950) {
    throw new RangeError('duration must be between 0 and 950 milliseconds.');
  }
  if (!Array.isArray(labels) || labels.length !== 3) throw new TypeError('Provide three unit labels.');

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const clock = document.createElement('div');
  clock.className = 'soft-countdown';
  clock.setAttribute('role', 'timer');
  clock.setAttribute('aria-live', 'off');
  const groups = labels.map(label => {
    const unit = document.createElement('div');
    unit.className = 'soft-countdown__unit';
    unit.setAttribute('aria-hidden', 'true');
    const digits = document.createElement('div');
    digits.className = 'soft-countdown__digits';
    const caption = document.createElement('div');
    caption.className = 'soft-countdown__label';
    caption.textContent = label;
    unit.append(digits, caption);
    clock.append(unit);
    return { digits, cells: [] };
  });
  root.append(clock);
  let previous = null;
  let completed = false;
  let destroyed = false;
  let timer;
  const animations = new Set();

  function cancelAnimations() {
    animations.forEach(animation => animation.cancel());
    animations.clear();
  }

  function fill(group, value) {
    group.digits.replaceChildren();
    group.cells = [...value].map(char => {
      const cell = document.createElement('span');
      cell.className = 'soft-countdown__digit';
      const current = document.createElement('span');
      current.className = 'soft-countdown__glyph';
      current.textContent = char;
      cell.append(current);
      group.digits.append(cell);
      return cell;
    });
  }

  function animateDigit(cell, char, animate) {
    const old = cell.lastElementChild;
    if (!animate || old.textContent === char) {
      old.textContent = char;
      cell.replaceChildren(old);
      return;
    }
    const next = document.createElement('span');
    next.className = 'soft-countdown__glyph';
    next.textContent = char;
    cell.append(next);
    const options = { duration, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'none' };
    const outgoing = old.animate([
      { transform: 'translateY(0)', opacity: 1 },
      { transform: 'translateY(-100%)', opacity: 0 },
    ], options);
    const incoming = next.animate([
      { transform: 'translateY(100%)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 },
    ], options);
    animations.add(outgoing);
    animations.add(incoming);
    outgoing.onfinish = () => { old.remove(); animations.delete(outgoing); };
    incoming.onfinish = () => { animations.delete(incoming); };
  }

  function update(force = false) {
    if (destroyed) return;
    // Recalculate against a real deadline: background tabs never accumulate drift.
    const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    if (remaining === previous && !force) return;
    const values = [Math.floor(remaining / 3600), Math.floor(remaining / 60) % 60, remaining % 60];
    const animate = !force && !document.hidden && !reducedMotion.matches && duration > 0
      && previous !== null && previous - remaining === 1;
    cancelAnimations();
    groups.forEach((group, i) => {
      const value = String(values[i]).padStart(2, '0');
      // Hours may exceed 99; keep every digit rather than truncating the time.
      if (group.cells.length !== value.length) fill(group, value);
      else group.cells.forEach((cell, index) => {
        const latest = cell.lastElementChild;
        cell.replaceChildren(latest);
        animateDigit(cell, value[index], animate);
      });
    });
    clock.setAttribute('aria-label', values.map((v, i) => `${v} ${labels[i]}`).join(', '));
    previous = remaining;
    if (remaining === 0 && !completed) {
      completed = true;
      clearInterval(timer);
      if (typeof onComplete === 'function') onComplete();
    }
  }

  const synchronize = () => update(true);
  document.addEventListener('visibilitychange', synchronize);
  reducedMotion.addEventListener('change', synchronize);
  timer = setInterval(update, 50);
  update(true);

  return {
    destroy() {
      destroyed = true;
      clearInterval(timer);
      cancelAnimations();
      document.removeEventListener('visibilitychange', synchronize);
      reducedMotion.removeEventListener('change', synchronize);
      clock.remove();
    },
  };
}
