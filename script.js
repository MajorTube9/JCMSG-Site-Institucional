const burger = document.querySelector("#burger");
const menu = document.querySelector("#menu");

if (burger && menu) {
  const setMenuOpen = (isOpen) => {
    burger.setAttribute("aria-expanded", String(isOpen));
    burger.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    menu.classList.toggle("open", isOpen);
  };

  burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuOpen(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      burger.focus();
    }
  });
}

const form = document.querySelector("#form");

if (form) {
  const status = document.querySelector("#status");
  const submitButton = form.querySelector('button[type="submit"]');
  const honeypot = form.querySelector('[name="_gotcha"]');
  const submissionKey = "jcmsg-form-submitted";
  let submissionSucceeded = false;

  const setError = (field) => {
    const error = form.querySelector(`[data-for="${field.id}"]`);
    if (!error) return;

    field.classList.add("invalid");
    field.setAttribute("aria-invalid", "true");
    error.textContent = field.validity.valueMissing
      ? "Preencha este campo."
      : "Confira o valor informado.";
  };

  const clearError = (field) => {
    const error = form.querySelector(`[data-for="${field.id}"]`);
    if (!error) return;

    field.classList.remove("invalid");
    field.removeAttribute("aria-invalid");
    error.textContent = "";
  };

  const clearFormState = () => {
    form.reset();
    form.querySelectorAll(".invalid").forEach((field) => clearError(field));
    status.textContent = "";
    status.className = "";
    submitButton.disabled = false;
  };

  window.addEventListener("pageshow", () => {
    let shouldClear = submissionSucceeded;

    try {
      shouldClear = shouldClear || sessionStorage.getItem(submissionKey) === "true";
    } catch (error) {
      console.warn("Não foi possível verificar o estado do formulário salvo:", error);
    }

    if (!shouldClear) return;

    clearFormState();
    submissionSucceeded = false;

    try {
      sessionStorage.removeItem(submissionKey);
    } catch (error) {
      console.warn("Não foi possível limpar o estado salvo do formulário:", error);
    }
  });

  form.addEventListener("invalid", (event) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      setError(event.target);
    }
  }, true);

  form.querySelectorAll("input[required], textarea[required]").forEach((field) => {
    field.addEventListener("input", () => {
      if (field.validity.valid) clearError(field);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    if (honeypot && honeypot.value) return;

    status.textContent = "Enviando sua mensagem...";
    status.className = "";
    submitButton.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`O serviço de formulário respondeu com status ${response.status}.`);
      }

      submissionSucceeded = true;
      try {
        sessionStorage.setItem(submissionKey, "true");
      } catch (error) {
        console.warn("Não foi possível salvar o estado do envio do formulário:", error);
      }

      form.reset();
      form.querySelectorAll(".invalid").forEach((field) => clearError(field));
      status.textContent = "Mensagem enviada! Obrigado pelo contato.";
      status.className = "ok";
    } catch (error) {
      console.error("Não foi possível enviar o formulário:", error);
      status.textContent = "Não foi possível enviar sua mensagem. Tente novamente ou entre em contato por e-mail.";
      status.className = "fail";
    } finally {
      submitButton.disabled = false;
    }
  });
}
