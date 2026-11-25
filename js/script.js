// Repete a digitação com pausas, mantendo o espaço e o texto acessível reservados.
const typingName = document.querySelector('[data-typing-name]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// O relevo segue o mouse com inércia e retorna ao centro ao sair da seção.
const hero = document.querySelector('.hero');
const terrain = hero?.querySelector('.hero-topography');

if (terrain) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let frame = null;
  let previousTime = 0;

  function moveTerrain(time) {
    const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16;
    previousTime = time;
    const ease = 1 - Math.exp(-elapsed / 140);
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    terrain.style.setProperty('--terrain-x', `${currentX.toFixed(2)}px`);
    terrain.style.setProperty('--terrain-y', `${currentY.toFixed(2)}px`);
    if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > .1) {
      frame = requestAnimationFrame(moveTerrain);
    } else {
      frame = null;
      previousTime = 0;
    }
  }

  function scheduleTerrain() {
    if (frame === null) frame = requestAnimationFrame(moveTerrain);
  }

  hero.addEventListener('pointermove', function (event) {
    if (reducedMotion.matches || event.pointerType !== 'mouse') return;
    const bounds = hero.getBoundingClientRect();
    targetX = ((event.clientX - bounds.left) / bounds.width - .5) * 64;
    targetY = ((event.clientY - bounds.top) / bounds.height - .5) * 44;
    scheduleTerrain();
  }, { passive: true });

  hero.addEventListener('pointerleave', function () {
    targetX = targetY = 0;
    if (!reducedMotion.matches) scheduleTerrain();
  });

  reducedMotion.addEventListener('change', function () {
    if (!reducedMotion.matches) return;
    cancelAnimationFrame(frame);
    frame = null;
    previousTime = targetX = targetY = currentX = currentY = 0;
    terrain.style.removeProperty('--terrain-x');
    terrain.style.removeProperty('--terrain-y');
  });
}

if (typingName && !reducedMotion.matches) {
  const name = typingName.querySelector('.typing-placeholder').textContent;
  const typedText = typingName.querySelector('.typing-text');
  let position = 0;
  let deleting = false;
  typingName.classList.add('is-typing');

  function typeNextLetter() {
    if (reducedMotion.matches) {
      typingName.classList.remove('is-typing');
      return;
    }

    position += deleting ? -1 : 1;
    typedText.textContent = name.slice(0, position);

    let delay = deleting ? 90 : 160;
    if (!deleting && position === name.length) {
      deleting = true;
      delay = 4000;
    } else if (deleting && position === 0) {
      deleting = false;
      delay = 800;
    }

    window.setTimeout(typeNextLetter, delay);
  }

  window.setTimeout(typeNextLetter, 300);
}

// Permite explorar as tecnologias por arraste, botões, toque ou teclado.
const skillsTrack = document.getElementById('lista-tecnologias');

if (skillsTrack) {
  const skillsPanel = skillsTrack.closest('.skills-panel');
  const controls = skillsPanel.querySelector('.skills-controls');
  const arrows = controls.querySelectorAll('[data-skills-direction]');
  controls.hidden = false;

  let drag = null;

  skillsTrack.addEventListener('pointerdown', function (event) {
    // O toque mantém a rolagem nativa, inclusive a navegação vertical da página.
    if (event.pointerType === 'touch' || event.button !== 0 || !event.isPrimary) return;
    drag = { pointerId: event.pointerId, startX: event.clientX, scrollLeft: skillsTrack.scrollLeft };
    skillsTrack.classList.add('is-dragging');
    skillsTrack.setPointerCapture(event.pointerId);
    skillsTrack.focus({ preventScroll: true });
    event.preventDefault();
  });

  skillsTrack.addEventListener('pointermove', function (event) {
    if (!drag || event.pointerId !== drag.pointerId) return;
    skillsTrack.scrollLeft = drag.scrollLeft - (event.clientX - drag.startX);
  });

  function stopDragging(event) {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const pointerId = drag.pointerId;
    drag = null;
    skillsTrack.classList.remove('is-dragging');
    if (skillsTrack.hasPointerCapture(pointerId)) skillsTrack.releasePointerCapture(pointerId);
    updateSkillsControls();
  }

  skillsTrack.addEventListener('pointerup', stopDragging);
  skillsTrack.addEventListener('pointercancel', stopDragging);
  skillsTrack.addEventListener('lostpointercapture', stopDragging);
  skillsTrack.addEventListener('dragstart', function (event) { event.preventDefault(); });

  function updateSkillsControls() {
    const maxScroll = skillsTrack.scrollWidth - skillsTrack.clientWidth;
    arrows.forEach(function (arrow) {
      arrow.disabled = Number(arrow.dataset.skillsDirection) < 0
        ? skillsTrack.scrollLeft <= 1
        : skillsTrack.scrollLeft >= maxScroll - 1;
    });
  }

  arrows.forEach(function (arrow) {
    arrow.addEventListener('click', function () {
      skillsTrack.scrollBy({
        left: Number(arrow.dataset.skillsDirection) * 224,
        behavior: reducedMotion.matches ? 'instant' : 'smooth'
      });
    });
  });

  skillsTrack.addEventListener('scroll', updateSkillsControls, { passive: true });
  window.addEventListener('resize', updateSkillsControls);
  updateSkillsControls();
}

// Mantém o ano do rodapé e da apresentação atualizado.
document.querySelectorAll('[data-year]').forEach(function (element) {
  element.textContent = new Date().getFullYear();
});

// Fecha o menu do celular depois que uma seção é escolhida.
const menu = document.getElementById('menu');

menu.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    if (menu.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});
