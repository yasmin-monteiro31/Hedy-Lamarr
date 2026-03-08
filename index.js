const perguntas = [
    {
      pergunta: "Ela nasceu em qual país?",
      opcoes: ["Áustria", "França", "Estados Unidos","Alemanha"],
      resposta: 3
    },
    {
      pergunta: "Além de atriz, ela também era:",
      opcoes: ["Cantora", "Inventora", "Escritora", "Médica"],
      resposta: 1
    },
    {
      pergunta: "Em que ano Hedy Lamarr nasceu?",
      opcoes: [ "1925","1914", "1908", "1932"],
      resposta: 1
    },
    {
      pergunta: "Qual era o nome completo verdadeiro dela?",
      opcoes: [
        "Hedwig Eva",
        "Hedwig Maria Strauss",
        "Eva Maria Antonella",
        "Helena Kiesler"
      ],
      resposta: 0
    },
    {
      pergunta: "Durante qual guerra ela desenvolveu sua invenção?",
      opcoes: [
        "Primeira Guerra Mundial",
        "Guerra Fria",
        "Segunda Guerra Mundial",
        "Guerra do Vietnã"
      ],
      resposta: 2
    },
    {
      pergunta: "O que era o 'salto de frequência'?",
      opcoes: [
        "Um tipo de filme",
        "Um sistema de comunicação seguro",
        "Um código secreto escrito",
        "Um aparelho de cinema"
      ],
      resposta: 1
    },
    {
      pergunta: "A invenção dela ajudou no desenvolvimento de:",
      opcoes: [
        "Máquina de escrever",
        "Televisão preta e branca",
        "Rádio comum",
        "Wi-Fi e Bluetooth",
      ],
      resposta: 3
    },
    {
      pergunta: "Com quem ela desenvolveu a tecnologia?",
      opcoes: [
        "Albert Einstein",
        "Nikola Tesla",
         "George Antheil",
         "Thomas Edison"
      ],
      resposta: 2
    },
    {
      pergunta: "Por muitos anos, Hedy foi reconhecida principalmente por:",
      opcoes: [
        "Sua inteligência científica",
        "Sua carreira política",
        "Sua beleza e atuação",
        "Seus livros"
      ],
      resposta: 2
    },
    {
      pergunta: "Em que ano Hedy Lamarr faleceu?",
      opcoes: ["2000","1995",  "1988", "2010"],
      resposta: 0
    }
  ];

  function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function embaralharOpcoes(pergunta) {
    const correta = pergunta.opcoes[pergunta.resposta];
  
    embaralhar(pergunta.opcoes);
  
    pergunta.resposta = pergunta.opcoes.indexOf(correta);
  }
  
  
  let perguntaAtual = 0;
  let pontuacao = 0;
  let respondeu = false;
  
  const intro = document.getElementById("intro");
  const quizSection = document.getElementById("quiz-section");
  const quiz = document.getElementById("quiz");
  const nextBtn = document.getElementById("next-btn");
  const result = document.getElementById("result");
  const somAcerto = new Audio("correto.mp3");
 const somErro = new Audio("errado.mp3");


  function startQuiz() {
    embaralhar(perguntas);
  
    intro.classList.add("hidden");
    quizSection.classList.remove("hidden");
    mostrarPergunta();
  }
  
  
  function mostrarPergunta() {
  respondeu = false;

  embaralharOpcoes(perguntas[perguntaAtual]);
  
  const p = perguntas[perguntaAtual];
  
    quiz.innerHTML = `
      <h3>${perguntaAtual + 1}. ${p.pergunta}</h3>
      ${p.opcoes
     .map(
      (op, i) =>
    `<div class="option" onclick="selecionar(${i})">${op}</div>`
        )
    .join("")}
    `;
  }
  
  function selecionar(indice) {
    if (respondeu) return;
  
    respondeu = true;
  
    const opcoes = document.querySelectorAll(".option");
    const respostaCorreta = perguntas[perguntaAtual].resposta;
  
    opcoes.forEach((opcao, i) => {
      opcao.style.pointerEvents = "none";
  
      if (i === respostaCorreta) {
        opcao.classList.add("correct");
      }
  
      if (i === indice && indice !== respostaCorreta) {
        opcao.classList.add("wrong");
      }
    });
  
    if (indice === respostaCorreta) {
      pontuacao++;
      somAcerto.play();
    } else {
      somErro.play();
    }
  }
    
  nextBtn.addEventListener("click", () => {
    if (!respondeu) return;
  
    perguntaAtual++;
  
    if (perguntaAtual < perguntas.length) {
      mostrarPergunta();
    } else {
      finalizarQuiz();
    }
  });
  
  function reiniciarQuiz() {
    perguntaAtual = 0;
    pontuacao = 0;
    respondeu = false;
  
    result.innerHTML = "";
    quiz.innerHTML = "";
  
    nextBtn.style.display = "inline-block";
  
    quizSection.classList.add("hidden");
    intro.classList.remove("hidden");
  }
  
  
  function finalizarQuiz() {
    quiz.innerHTML = "";
    nextBtn.style.display = "none";
  
    let mensagem = "";
  
    if (pontuacao >= 9) {
      mensagem = "🏆 Excelente! Você sabe tudo sobre Hedy Lamarr!";
    } else if (pontuacao >= 6) {
      mensagem = "👏 Muito bem! Você foi muito bem no quiz!";
    } else {
      mensagem = "🙂 Você pode tentar novamente para melhorar!";
    }
  
    result.innerHTML = `
      <h2>Você acertou ${pontuacao} de ${perguntas.length}</h2>
      <p>${mensagem}</p>
      <button onclick="reiniciarQuiz()" class="restart-btn">
        🔄 Recomeçar Quiz
      </button>
    `;
  }
  