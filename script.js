document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

  // Tabs for Services
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  function activateTab(tabName) {
    tabButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.tab === tabName);
    });
    tabContents.forEach((content) => {
      content.classList.toggle("active", content.id === tabName);
    });
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activateTab(button.dataset.tab);
    });
  });
  // Ativa a primeira aba por padrão ao carregar a página
  activateTab("suporte");

  // Chart.js for Client Sectors
  const ctx = document.getElementById("clientSectorsChart").getContext("2d");
  const clientSectorsChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: [
        "Entretenimento & Música",
        "Publicidade & Eventos",
        "Finanças",
        "Telecomunicações",
        "Tecnologia",
        "Outros",
      ],
      datasets: [
        {
          label: "Distribuição de Clientes por Setor",
          data: [25, 20, 15, 15, 15, 10],
          backgroundColor: [
            "#6a0dad" /* Purple */,
            "#8a2be2" /* Blue Violet */,
            "#9370db" /* Medium Purple */,
            "#ba55d3" /* Medium Orchid */,
            "#da70d6" /* Orchid */,
            "#c71585" /* Medium Violet Red */,
          ],
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 15,
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed !== null) {
                label += context.parsed + "%";
              }
              return label;
            },
          },
        },
      },
    },
  });

  // Scroll animations
  const sections = document.querySelectorAll(".section-fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Dark/Light Mode Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement; // Usar document.documentElement para aplicar classes ao <html>

  // Função para aplicar o tema
  function applyTheme(theme) {
    if (theme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }

  // Carrega o tema salvo no localStorage ou define como 'light' por padrão
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  // Adiciona evento de clique ao botão de alternância de tema
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      if (htmlElement.classList.contains("dark")) {
        htmlElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        htmlElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
    });
  }

  // WhatsApp Contact Link
  const whatsappLink = document.querySelector(
    'a[href^="mailto:contato@pridom.com.br"]'
  );
  if (whatsappLink) {
    // Substitua 'SEUNUMERODEWHATSAPP' pelo número de telefone real da Pridom, incluindo o código do país e DDD, sem espaços ou caracteres especiais. Ex: 5511987654321
    const phoneNumber = "5511987250373";
    const message = encodeURIComponent(
      "Olá, gostaria de saber mais sobre os serviços da Pridom."
    );
    whatsappLink.href = `https://wa.me/${phoneNumber}?text=${message}`;
    whatsappLink.textContent = "Fale Conosco no WhatsApp"; // Altera o texto do botão
  }

  document.getElementById("form-comentario").addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    try {
      const response = await fetch("comentarios-pridom/cadastrarComentario.php", {
        method: "POST",
        body: formData
      });

      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
});

});
