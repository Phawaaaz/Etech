const dummyContent = {
  text: `## Quantum Computing: A Beginner's Guide

**Quantum computing** is a type of computing that uses the principles of quantum mechanics to process information in ways that classical computers cannot.

### Key Concepts

**1. Qubits**
Unlike classical bits (0 or 1), qubits can exist in a *superposition* — both 0 and 1 at the same time. This lets quantum computers explore many solutions simultaneously.

**2. Entanglement**
Two qubits can be *entangled*, meaning the state of one instantly affects the other, no matter the distance.

**3. Interference**
Quantum computers use interference to amplify correct answers and cancel out wrong ones.

### Why It Matters
Quantum computers can solve certain problems — like breaking encryption, simulating molecules, or optimizing logistics — exponentially faster than any classical computer.

### Real-World Use Cases
- Drug discovery and molecular simulation
- Cryptography and cybersecurity
- Financial modeling and optimization
- Artificial intelligence acceleration`,

  audio: `Welcome to today's lesson on Quantum Computing.

Imagine you're in a maze. A classical computer tries one path at a time until it finds the exit. A quantum computer tries all paths at the same time. That's the power of quantum computing.

At the heart of it is something called a qubit. Unlike a regular bit that is either zero or one, a qubit can be both at the same time. This is called superposition.

Another key idea is entanglement. When two qubits are entangled, changing one instantly changes the other — even if they're on opposite sides of the planet.

Scientists are using quantum computers today to simulate molecules for new medicines, to crack complex optimization problems, and to push the boundaries of artificial intelligence.

Quantum computing is still in its early stages, but it has the potential to change everything. And now, you understand the basics of how it works.`,

  image: `https://image.pollinations.ai/prompt/educational%20illustration%20of%20quantum%20computing%20concept%20with%20qubits%20and%20superposition%2C%20colorful%2C%20beginner%20friendly%2C%20minimalist%20style?width=800&height=600&nologo=true`,

  interactive: [
    {
      question: "What is a qubit?",
      options: [
        "A unit of classical data that is either 0 or 1",
        "A quantum bit that can be 0, 1, or both simultaneously",
        "A type of quantum gate",
        "A measure of quantum computing speed",
      ],
      answer: "A quantum bit that can be 0, 1, or both simultaneously",
      explanation:
        "A qubit leverages superposition to exist in multiple states at once, unlike classical bits which are always either 0 or 1.",
    },
    {
      question: "What is quantum superposition?",
      options: [
        "The ability of a qubit to be both 0 and 1 at the same time",
        "The speed at which quantum computers operate",
        "A method of error correction in quantum systems",
        "The entanglement of two separate qubits",
      ],
      answer: "The ability of a qubit to be both 0 and 1 at the same time",
      explanation:
        "Superposition allows quantum computers to explore many possible solutions simultaneously.",
    },
    {
      question: "What does quantum entanglement mean?",
      options: [
        "Two qubits are physically connected by a wire",
        "A qubit collapses to a definite state when measured",
        "Two qubits share a linked state so changing one affects the other",
        "A quantum computer overheats when running complex problems",
      ],
      answer:
        "Two qubits share a linked state so changing one affects the other",
      explanation:
        "Entangled qubits remain correlated regardless of distance — a key resource in quantum computing.",
    },
    {
      question: "Which of the following is a real-world use case for quantum computing?",
      options: [
        "Browsing the internet faster",
        "Simulating molecules for drug discovery",
        "Running mobile apps more efficiently",
        "Storing larger files on a hard drive",
      ],
      answer: "Simulating molecules for drug discovery",
      explanation:
        "Quantum computers excel at simulating quantum systems, making them ideal for pharmaceutical research.",
    },
    {
      question: "How does a quantum computer differ from a classical computer?",
      options: [
        "It uses electricity instead of light",
        "It can only solve math problems",
        "It processes information using quantum mechanical principles like superposition and entanglement",
        "It is always faster than a classical computer at every task",
      ],
      answer:
        "It processes information using quantum mechanical principles like superposition and entanglement",
      explanation:
        "Quantum computers aren't universally faster — they excel at specific problem types that classical computers struggle with.",
    },
  ],

  video: [
    {
      scene: 1,
      title: "What Is Quantum Computing?",
      narration:
        "Classical computers process information as bits — either 0 or 1. Quantum computers use qubits, which can be 0, 1, or both at the same time thanks to a property called superposition.",
      visual_description:
        "Split screen: left side shows a classical binary switch flipping between 0 and 1; right side shows a glowing qubit sphere spinning in both states simultaneously.",
    },
    {
      scene: 2,
      title: "Superposition Explained",
      narration:
        "Think of superposition like a coin spinning in the air — it's neither heads nor tails until it lands. A qubit works the same way, existing in all states until measured.",
      visual_description:
        "Animation of a spinning coin slowing down and landing, transitioning into a qubit collapsing from a wave into a definite state.",
    },
    {
      scene: 3,
      title: "Quantum Entanglement",
      narration:
        "When two qubits are entangled, measuring one instantly determines the state of the other — no matter how far apart they are. Einstein called this 'spooky action at a distance.'",
      visual_description:
        "Two glowing orbs connected by a beam of light. When one orb changes color, the other instantly mirrors it across a starfield background.",
    },
    {
      scene: 4,
      title: "Why It Matters",
      narration:
        "Quantum computers can solve certain problems exponentially faster than classical computers — from breaking encryption to discovering new medicines by simulating molecules.",
      visual_description:
        "Montage: a DNA helix being analyzed, a lock being decrypted, a logistics network optimizing in real-time.",
    },
    {
      scene: 5,
      title: "The Future of Quantum",
      narration:
        "We're still in the early days, but companies like IBM, Google, and startups worldwide are racing to build the first truly practical quantum computer. The quantum revolution is coming.",
      visual_description:
        "A futuristic lab with scientists working on quantum hardware, ending with a zoom-out to the Earth with glowing quantum circuits overlaid.",
    },
  ],
};

export const mockGenerate = ({ format, topic, level, prompt }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          id: `gen_${Math.random().toString(36).slice(2, 9)}`,
          format,
          content: dummyContent[format],
          topic,
          level,
          prompt,
          createdAt: new Date().toISOString(),
        },
      });
    }, 1500);
  });
};
