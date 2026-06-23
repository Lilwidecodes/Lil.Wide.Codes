/* MAIN CONTROLLER - Lil.Wide.Codes V3 | Purpose: Spotlight glow, text scramble, terminal shell, offline banners, code sandbox & blueprints */

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. PROGRESS BAR SCROLL DEPTH
  const progress = document.querySelector(".progress-bar");
  if (progress) {
    window.addEventListener("scroll", () => {
      const current = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (height > 0) {
        const percent = (current / height) * 100;
        progress.style.width = percent + "%";
      } else {
        progress.style.width = "0%";
      }
    });
  }

  // 2. SPOTLIGHT GLOW EFFECT (Moused card tracking)
  const glowCards = document.querySelectorAll(".interactive-glow");
  glowCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // 3. TEXT SCRAMBLE / DECODER EFFECT
  class TextScrambler {
    constructor(element) {
      this.el = element;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }
    
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    
    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="mono" style="color: var(--color-accent-cyan)">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  // Hook scramble effect to titles
  const scrambleTitles = document.querySelectorAll("[data-scramble]");
  scrambleTitles.forEach(title => {
    const originalText = title.innerText;
    const scrambler = new TextScrambler(title);
    scrambler.setText(originalText);
    
    title.addEventListener("mouseenter", () => {
      scrambler.setText(originalText);
    });
  });

  // 4. SCROLL REVEAL (Intersection Observer)
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });
    
    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add("revealed"));
  }

  // 5. INTERACTIVE TERMINAL WIDGET
  const terminal = document.getElementById("terminal-widget");
  if (terminal) {
    const body = terminal.querySelector(".terminal-body");
    const input = terminal.querySelector(".terminal-text-input");
    
    const commandResponses = {
      help: "Available commands:<br>&nbsp;&nbsp;about&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Learn why we exist<br>&nbsp;&nbsp;projects&nbsp;&nbsp;- Show active system developments<br>&nbsp;&nbsp;roadmap&nbsp;&nbsp;&nbsp;- View version timelines<br>&nbsp;&nbsp;vision&nbsp;&nbsp;&nbsp;&nbsp;- Long-term product roadmap<br>&nbsp;&nbsp;social&nbsp;&nbsp;&nbsp;&nbsp;- Links to public building channels<br>&nbsp;&nbsp;clear&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear the console screen",
      about: "LIL.WIDE.CODES is a technology brand built on honesty and capability.<br>We master fundamentals, build real systems, and improve publicly.<br>Goal: Evolve from an engineering journal into a software products company.",
      projects: "Active Projects:<br>&nbsp;&nbsp;1. Lil.Wide.Codes Hub (Production - HTML/CSS/JS)<br>&nbsp;&nbsp;2. Web System Tools (Planned - Developer Utilities)<br>&nbsp;&nbsp;3. AI Automations (Vision - Smart developer assistants)<br>Type 'view projects' in browser to go to projects page.",
      roadmap: "Roadmap Milestones:<br>&nbsp;&nbsp;V1 - Foundation (Active web presence - Completed)<br>&nbsp;&nbsp;V2 - Interactivity (Dynamic filtering, JS behavior - Active)<br>&nbsp;&nbsp;V3 - Intelligence (AI toolkits and product downloads - Planned)",
      vision: "Our vision is build-centric: grow a portfolio of useful digital applications.<br>No shortcuts. No placeholders. Real downloadable tools.",
      social: "Follow the development loop:<br>&nbsp;&nbsp;- YouTube: Lil.Wide.Codes<br>&nbsp;&nbsp;- TikTok: @lil.wide.codes<br>&nbsp;&nbsp;- GitHub: github.com/lil-wide-codes",
      clear: "clear"
    };

    const printLine = (text, className = "terminal-output") => {
      const line = document.createElement("div");
      line.className = `terminal-line ${className}`;
      line.innerHTML = text;
      body.insertBefore(line, body.querySelector(".terminal-input-line"));
      body.scrollTop = body.scrollHeight;
    };

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const cmd = input.value.trim().toLowerCase();
        input.value = "";
        
        printLine(`$ ${cmd}`, "terminal-echo");
        if (cmd === "") return;
        
        if (cmd === "clear") {
          const lines = body.querySelectorAll(".terminal-line");
          lines.forEach(l => l.remove());
        } else if (commandResponses[cmd]) {
          printLine(commandResponses[cmd]);
        } else {
          printLine(`Command not found: ${cmd}. Type <span style="color: var(--color-accent-cyan)">'help'</span> for list.`, "terminal-error");
        }
      }
    });

    body.addEventListener("click", () => {
      input.focus();
    });
  }

  // 6. DYNAMIC PROJECTS FILTERING
  const projectGrid = document.querySelector(".project-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  if (projectGrid && filterBtns.length > 0) {
    const cards = projectGrid.querySelectorAll(".project-card");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        const filterVal = btn.getAttribute("data-filter");
        cards.forEach(card => {
          const cardType = card.getAttribute("data-type");
          if (filterVal === "all" || cardType === filterVal) {
            card.style.display = "block";
            card.style.opacity = "0";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 50);
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // 7. INTERACTIVE CLIENT-SIDE CODE SANDBOX RUNNERS
  const sandboxRunners = document.querySelectorAll(".sandbox-run-btn");
  sandboxRunners.forEach(btn => {
    btn.addEventListener("click", () => {
      const sandbox = btn.closest(".code-sandbox");
      if (!sandbox) return;
      
      const code = sandbox.getAttribute("data-code");
      const outputBox = sandbox.querySelector(".sandbox-output");
      if (!outputBox) return;

      let logs = [];
      const fakeConsole = {
        log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(" "))
      };

      try {
        const runFn = new Function("console", code);
        runFn(fakeConsole);
        outputBox.innerHTML = `<strong>Output:</strong><br>${logs.length > 0 ? logs.join("<br>") : "Script executed successfully with no console output."}`;
        outputBox.style.color = "var(--color-accent-cyan)";
      } catch (err) {
        outputBox.innerHTML = `<strong>Execution Error:</strong><br>${err.message}`;
        outputBox.style.color = "#ff5f56";
      }

      outputBox.classList.add("open");
    });
  });

  // 8. INTERACTIVE SVG BLUEPRINT DIAGRAM NODES
  const blueprintNodes = document.querySelectorAll(".blueprint-node");
  const infoTitle = document.getElementById("blueprint-info-title");
  const infoDesc = document.getElementById("blueprint-info-desc");

  if (blueprintNodes.length > 0 && infoTitle && infoDesc) {
    blueprintNodes.forEach(node => {
      const activateNode = () => {
        blueprintNodes.forEach(n => n.classList.remove("active"));
        node.classList.add("active");

        const title = node.getAttribute("data-title");
        const desc = node.getAttribute("data-desc");

        infoTitle.innerText = title;
        infoDesc.innerText = desc;
      };

      node.addEventListener("mouseenter", activateNode);
      node.addEventListener("click", activateNode);
    });
  }

  // 9. OFFLINE CONNECTION WARNING BANNER
  const banner = document.createElement("div");
  banner.className = "offline-banner";
  banner.innerText = "Connection lost. Serving site pages from offline cache.";
  document.body.appendChild(banner);

  const updateOnlineStatus = () => {
    if (navigator.onLine) {
      banner.classList.remove("visible");
    } else {
      banner.classList.add("visible");
    }
  };

  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
  updateOnlineStatus();
});
