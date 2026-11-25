// Repete a digitação com pausas, mantendo o espaço e o texto acessível reservados.
const typingName = document.querySelector('[data-typing-name]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// O relevo segue o mouse com inércia e retorna ao centro ao sair da seção.
document.querySelectorAll('.hero, #contato').forEach(function (surface) {
  const terrain = surface.querySelector('.hero-topography');
  if (!terrain) return;
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

  surface.addEventListener('pointermove', function (event) {
    if (reducedMotion.matches || event.pointerType !== 'mouse') return;
    const bounds = surface.getBoundingClientRect();
    targetX = ((event.clientX - bounds.left) / bounds.width - .5) * 64;
    targetY = ((event.clientY - bounds.top) / bounds.height - .5) * 44;
    scheduleTerrain();
  }, { passive: true });

  surface.addEventListener('pointerleave', function () {
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
});

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
  let suppressSkillClick = false;
  skillsTrack.addEventListener('click', function (event) {
    if (!suppressSkillClick || event.detail === 0) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);

  skillsTrack.addEventListener('pointerdown', function (event) {
    suppressSkillClick = false;
    // O toque mantém a rolagem nativa, inclusive a navegação vertical da página.
    if (event.pointerType === 'touch' || event.button !== 0 || !event.isPrimary) return;
    drag = { pointerId: event.pointerId, startX: event.clientX, scrollLeft: skillsTrack.scrollLeft, moved: false };
    if (!event.target.closest('button')) {
      skillsTrack.focus({ preventScroll: true });
      event.preventDefault();
    }
  });

  skillsTrack.addEventListener('pointermove', function (event) {
    if (!drag || event.pointerId !== drag.pointerId) return;
    if (!drag.moved && Math.abs(event.clientX - drag.startX) < 6) return;
    drag.moved = true;
    skillsTrack.classList.add('is-dragging');
    if (!skillsTrack.hasPointerCapture(event.pointerId)) skillsTrack.setPointerCapture(event.pointerId);
    skillsTrack.scrollLeft = drag.scrollLeft - (event.clientX - drag.startX);
  });

  function stopDragging(event) {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const pointerId = drag.pointerId;
    suppressSkillClick = drag.moved;
    drag = null;
    skillsTrack.classList.remove('is-dragging');
    if (skillsTrack.hasPointerCapture(pointerId)) skillsTrack.releasePointerCapture(pointerId);
    updateSkillsControls();
  }

  skillsTrack.addEventListener('pointerup', stopDragging);
  skillsTrack.addEventListener('pointercancel', stopDragging);
  skillsTrack.addEventListener('lostpointercapture', stopDragging);
  window.addEventListener('pointerup', stopDragging);
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

// Luz nos cartões por mouse, toque ou foco, sem interferir nos botões.
const aboutSection = document.getElementById('sobre');
document.querySelectorAll('.foundation-card, #sobre .skills-panel, .contact-card, .project-card').forEach(function (panel) {
    let lightTimer;
    function lightPanel(event) {
      const bounds = panel.getBoundingClientRect();
      panel.style.setProperty('--glow-x', `${event.clientX - bounds.left}px`);
      panel.style.setProperty('--glow-y', `${event.clientY - bounds.top}px`);
      panel.classList.add('is-lit');
    }
    panel.addEventListener('pointermove', function (event) {
      if (event.pointerType === 'mouse') lightPanel(event);
    }, { passive: true });
    panel.addEventListener('pointerleave', function () { panel.classList.remove('is-lit'); });
    panel.addEventListener('pointerdown', function (event) {
      lightPanel(event);
      clearTimeout(lightTimer);
      lightTimer = setTimeout(function () { panel.classList.remove('is-lit'); }, 1000);
    }, { passive: true });
    panel.addEventListener('focusin', function () { panel.classList.add('is-lit'); });
    panel.addEventListener('focusout', function (event) {
      if (!panel.contains(event.relatedTarget)) panel.classList.remove('is-lit');
    });
});

if (aboutSection) {
  const details = {
    HTML: 'Estrutura das páginas no portfólio, no NovaJornada e no Race Strategy.',
    CSS: 'Layouts responsivos, identidade visual e animações deste portfólio, além das interfaces dos projetos web.',
    JavaScript: 'Interações deste portfólio e atualização da telemetria no Race Strategy.',
    'Node.js': 'Backend do NovaJornada, com Express e SQLite.',
    Python: 'Uma das linguagens do meu repertório. Ainda não há um projeto específico em Python apresentado neste portfólio.',
    Bootstrap: 'Grid responsivo e menu de navegação deste portfólio.',
    C: 'Gerenciamento de senhas de atendimento, com filas normais, preferenciais e urgentes.',
    MySQL: 'Tecnologia do meu repertório de banco de dados. Ainda não há um projeto com MySQL apresentado neste portfólio.',
    Docker: 'Deploy do Race Strategy, junto ao Nginx, na Oracle Cloud.'
  };
  const detail = document.getElementById('detalhe-tecnologia');
  aboutSection.querySelectorAll('[data-skill]').forEach(function (button) {
    button.addEventListener('click', function () {
      aboutSection.querySelectorAll('[data-skill]').forEach(function (choice) {
        choice.setAttribute('aria-pressed', String(choice === button));
      });
      detail.querySelector('strong').textContent = button.dataset.skill;
      detail.querySelector('p').textContent = details[button.dataset.skill];
      detail.classList.remove('is-changing');
      if (!reducedMotion.matches) {
        void detail.offsetWidth;
        detail.classList.add('is-changing');
      }
    });
  });

  const revealItems = aboutSection.querySelectorAll('[data-about-reveal]');
  const track = aboutSection.querySelector('.foundations-track');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const aboutObserver = new IntersectionObserver(function (entries) {
      let order = 0;
      entries.forEach(function (entry) {
        if (entry.target === track) {
          track.classList.toggle('is-connected', entry.isIntersecting);
          return;
        }
        const item = entry.target.firstElementChild;
        if (entry.isIntersecting) {
          item.style.setProperty('--about-delay', `${Math.min(order++, 3) * 100}ms`);
          item.classList.remove('about-pending');
          item.classList.add('about-revealed');
        } else if (!item.contains(document.activeElement)) {
          item.classList.remove('about-revealed');
          item.classList.add('about-pending');
        }
      });
    }, { threshold: 0 });
    revealItems.forEach(function (item) {
      const frame = document.createElement('div');
      frame.className = 'about-reveal-frame';
      item.before(frame);
      frame.append(item);
      item.classList.add('about-pending');
      aboutObserver.observe(frame);
      item.addEventListener('focusin', function () {
        item.classList.remove('about-pending');
        item.classList.add('about-revealed');
      });
    });
    aboutObserver.observe(track);
    reducedMotion.addEventListener('change', function () {
      if (!reducedMotion.matches) return;
      aboutObserver.disconnect();
      track.classList.add('is-connected');
      revealItems.forEach(function (item) {
        item.classList.remove('about-pending');
        item.classList.add('about-revealed');
      });
    });
  } else {
    track.classList.add('is-connected');
    revealItems.forEach(function (item) { item.classList.add('about-revealed'); });
  }
}

// Repete a entrada ao reaparecer, observando uma moldura fixa para evitar oscilações.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const projectObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      const card = entry.target.firstElementChild;
      if (!entry.isIntersecting) {
        if (card.contains(document.activeElement)) return;
        card.classList.remove('reveal-visible');
        card.classList.toggle('reveal-from-top', entry.boundingClientRect.bottom <= 0);
        card.classList.add('reveal-pending');
        return;
      }
      card.classList.remove('reveal-pending');
      card.classList.add('reveal-visible');
    });
  }, { threshold: 0 });

  document.querySelectorAll('.project-card').forEach(function (card) {
    const frame = document.createElement('div');
    frame.className = 'project-reveal-frame';
    card.before(frame);
    frame.append(card);
    card.classList.toggle('reveal-from-top', frame.getBoundingClientRect().bottom <= 0);
    card.classList.add('reveal-pending');
    projectObserver.observe(frame);
    card.addEventListener('animationend', function (event) {
      if (event.target !== card || event.animationName !== 'project-reveal') return;
      card.classList.remove('reveal-visible');
    });
    card.addEventListener('focusin', function () {
      card.classList.remove('reveal-pending', 'reveal-visible');
      projectObserver.unobserve(frame);
    });
  });

  reducedMotion.addEventListener('change', function () {
    if (!reducedMotion.matches) return;
    projectObserver.disconnect();
    document.querySelectorAll('.project-card').forEach(function (card) {
      card.classList.remove('reveal-pending', 'reveal-visible');
    });
  });
}

// Usa uma linha de leitura abaixo do cabeçalho para marcar a seção atual.
const sectionLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
const navigationSections = sectionLinks.map(function (link) {
  return { link, section: document.querySelector(link.getAttribute('href')) };
}).filter(function (item) { return item.section; });
let navigationFrame = null;

// Uma volta completa do símbolo entre o início e o fim da página.
const brandSymbol = document.querySelector('.brand-symbol');
function updateBrandRotation() {
  if (!brandSymbol) return;
  if (reducedMotion.matches) {
    brandSymbol.style.removeProperty('--brand-rotation');
    return;
  }
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollRange > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollRange)) : 0;
  brandSymbol.style.setProperty('--brand-rotation', `${(progress * 360).toFixed(2)}deg`);
}
reducedMotion.addEventListener('change', updateBrandRotation);

function updateCurrentSection() {
  navigationFrame = null;
  updateBrandRotation();
  const headerHeight = document.querySelector('.site-header')?.offsetHeight || 72;
  const readingLine = headerHeight + 100;
  let current = null;
  navigationSections.forEach(function (item) {
    if (item.section.getBoundingClientRect().top <= readingLine) current = item;
  });
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    current = navigationSections[navigationSections.length - 1];
  }
  navigationSections.forEach(function (item) {
    if (item === current) item.link.setAttribute('aria-current', 'location');
    else item.link.removeAttribute('aria-current');
  });
}

function scheduleNavigationUpdate() {
  if (navigationFrame === null) navigationFrame = requestAnimationFrame(updateCurrentSection);
}
window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
window.addEventListener('resize', scheduleNavigationUpdate);
window.addEventListener('load', scheduleNavigationUpdate);
updateCurrentSection();

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
