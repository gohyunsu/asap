const PAPER_URL = "https://arxiv.org/abs/2502.01143";
const PROJECT_URL = "https://agile.human2humanoid.com/";
const CODE_URL = "https://github.com/LeCAR-Lab/ASAP";
const DEEPMIMIC_URL = "https://xbpeng.github.io/projects/DeepMimic/index.html";
const AMP_URL = "https://xbpeng.github.io/projects/AMP/index.html";
const PARKOUR_URL = "https://humanoid4parkour.github.io/";
const HUMANPLUS_URL = "https://humanoid-ai.github.io/";

window.ASAP_DECK = {
  title: "ASAP: Aligning Simulation and Real-World Physics",
  subtitle: "A compact final-presentation deck on agile humanoid whole-body transfer",
  sections: [
    {
      key: "setup",
      label: "1 Thesis",
      chapters: ["Problem", "Mechanism"],
    },
    {
      key: "landscape",
      label: "2 Landscape",
      chapters: ["Why Now", "Related Work", "Positioning"],
    },
    {
      key: "pretrain",
      label: "3 Pretraining",
      chapters: ["Reference", "Policy", "Gap"],
    },
    {
      key: "alignment",
      label: "4 Alignment",
      chapters: ["Data", "Delta Model", "Fine-tuning"],
    },
    {
      key: "evidence",
      label: "5 Evidence",
      chapters: ["Design", "Results", "Ablations"],
    },
    {
      key: "takeaways",
      label: "6 Takeaways",
      chapters: ["Summary", "Limits", "Resources"],
    },
  ],
  slides: [
    {
      section: "setup",
      chapter: "Problem",
      title: "ASAP",
      subtitle: "Aligning simulation and real-world physics for agile humanoid whole-body skills",
      lead: "The paper addresses a narrow but important transfer problem: a motion-tracking policy looks strong in simulation, yet loses agility on hardware because the robot's effective physics is different.",
      points: [
        "<strong>Focus.</strong> Agile, whole-body reference tracking on the Unitree G1.",
        "<strong>Claim.</strong> Use real rollouts to reshape the training simulator, then fine-tune the policy there.",
      ],
      visual: {
        type: "image",
        src: "assets/g1_motion.gif",
        alt: "ASAP Unitree G1 whole-body motion tracking",
        caption: "ASAP targets dynamic whole-body motion transfer on the Unitree G1.",
        source: PROJECT_URL,
        sourceLabel: "project",
      },
    },
    {
      section: "setup",
      chapter: "Problem",
      variant: "hero",
      title: "What the paper is trying to preserve",
      subtitle: "The target is not just motion style in simulation, but stable, expressive, closed-loop execution.",
      visual: {
        type: "video",
        src: "https://agile.human2humanoid.com/static/videos/Hero-ASAP-Video-Website-Hero-16-9-202502031028-1080P.mp4",
        cover: true,
        caption: "Official ASAP project video.",
        source: PROJECT_URL,
        sourceLabel: "project",
      },
    },
    {
      section: "setup",
      chapter: "Problem",
      title: "The bottleneck is no longer motion generation",
      subtitle: "The harder question is whether expressive motion survives closed-loop execution on the real robot.",
      points: [
        "Human motion reconstruction and imitation learning already produce rich reference behavior.",
        "The failure point is <strong>transfer under contact, actuation, and hidden compliance mismatch</strong>.",
        "ASAP treats that mismatch as a training-physics problem, not a reference-motion problem.",
      ],
      visual: {
        type: "cards",
        cols: 3,
        items: [
          ["Reference", "Human motion gives the controller something expressive to imitate."],
          ["Policy", "Simulation can already train a strong tracking controller."],
          ["Transfer", "Real hardware exposes the physics the simulator still misses."],
        ],
      },
    },
    {
      section: "setup",
      chapter: "Mechanism",
      title: "Core mechanism",
      subtitle: "Measure the physics gap from real rollouts, correct the simulator through action residuals, then fine-tune the policy under that corrected simulator.",
      visual: {
        type: "image",
        src: "assets/asap_pipeline.png",
        alt: "ASAP pipeline figure",
        caption: "ASAP pipeline figure.",
        source: PROJECT_URL,
        sourceLabel: "project",
      },
      points: [
        "The pipeline is two-stage: <strong>pretrain a strong tracker</strong>, then <strong>align the simulator with real rollouts</strong> before final fine-tuning.",
        "The deployed artifact remains a single policy.",
        "The delta model improves training dynamics rather than patching runtime control.",
      ],
    },

    {
      section: "landscape",
      chapter: "Why Now",
      title: "Why this problem matters now",
      subtitle: "Humanoid skill papers are increasingly strong at reference generation, control, and perception; the remaining question is how much of that capability transfers intact.",
      visual: {
        type: "pipeline",
        steps: [
          ["Reference motion", "Human video and motion data provide far richer targets than before."],
          ["Whole-body control", "Simulator policies can now track dynamic behavior with high fidelity."],
          ["Real deployment", "Transfer still breaks when hidden physics distorts closed-loop execution."],
        ],
      },
      points: [
        "ASAP matters because it focuses on the last interface in this stack: <strong>policy vs. hardware physics</strong>.",
      ],
    },
    {
      section: "landscape",
      chapter: "Why Now",
      title: "Agile whole-body skills expose mismatch early",
      subtitle: "These motions compress impact, balance, timing, and actuation errors into a very short horizon.",
      visual: {
        type: "terms",
        cols: 2,
        items: [
          ["Impact timing", "Landing a frame late can completely change the next state."],
          ["Actuator gap", "Torque, delay, and bandwidth limits become visible under fast motion."],
          ["Hidden compliance", "Feet, ankles, and linkages behave less rigidly than the simulator assumes."],
          ["Balance margin", "Dynamic motions leave very little slack for recovery."],
        ],
      },
    },
    {
      section: "landscape",
      chapter: "Why Now",
      title: "A useful reading frame for this literature",
      subtitle: "Most recent humanoid skill papers differ along four axes.",
      visual: {
        type: "table",
        headers: ["Axis", "Question", "What separates methods"],
        rows: [
          ["Reference source", "Where does the motion come from?", "MoCap, video reconstruction, teleoperation, or learned priors."],
          ["Control objective", "What is the policy trying to preserve?", "Pose tracking, style, task completion, or end-task success."],
          ["Transfer strategy", "How is sim-to-real handled?", "Robustness, system ID, residual modeling, or real-data fine-tuning."],
          ["Real evidence", "What counts as success?", "Simulator fidelity, cross-simulator transfer, or closed-loop hardware execution."],
        ],
      },
      layout: "wide",
    },

    {
      section: "landscape",
      chapter: "Related Work",
      title: "DeepMimic established the imitation-learning template",
      subtitle: "It showed that RL can turn reference motion into robust physics-based behavior.",
      visual: {
        type: "image",
        src: "assets/deepmimic_teaser.png",
        alt: "DeepMimic teaser image",
        caption: "DeepMimic: example-guided deep reinforcement learning of physics-based character skills.",
        source: DEEPMIMIC_URL,
        sourceLabel: "project",
      },
      points: [
        "Its key contribution is the <strong>reference-tracking RL template</strong> for dynamic motion imitation.",
        "It is foundational for ASAP's stage-1 story, but it does not solve real-hardware transfer by itself.",
      ],
    },
    {
      section: "landscape",
      chapter: "Related Work",
      title: "AMP made motion priors a first-class control signal",
      subtitle: "Instead of hand-crafting every style reward, AMP learns a motion prior from data.",
      visual: {
        type: "image",
        src: "assets/amp_teaser.png",
        alt: "AMP teaser image",
        caption: "AMP: adversarial motion priors for stylized physics-based character control.",
        source: AMP_URL,
        sourceLabel: "project",
      },
      points: [
        "AMP is important because it shifts part of the controller's behavior prior from reward design to data.",
        "For ASAP, it is conceptually adjacent: both methods use learned structure rather than only manual simulator tuning.",
      ],
    },
    {
      section: "landscape",
      chapter: "Related Work",
      title: "HumanPlus highlights real humanoid imitation and deployment",
      subtitle: "It demonstrates that rich human behavior can reach real humanoids, but through a different interface and goal.",
      visual: {
        type: "image",
        src: "assets/humanplus_preview.gif",
        alt: "HumanPlus preview",
        caption: "HumanPlus: humanoid shadowing and imitation from humans.",
        source: HUMANPLUS_URL,
        sourceLabel: "project",
      },
      points: [
        "Its emphasis is imitation from humans to robot behavior in the real world.",
        "Compared with ASAP, it contributes more to the <strong>behavior source and deployment story</strong> than to simulator alignment itself.",
      ],
    },
    {
      section: "landscape",
      chapter: "Related Work",
      title: "Humanoid Parkour pushes dynamic task difficulty from another direction",
      subtitle: "It shows what modern humanoid control can do when agility, perception, and long-horizon task structure are all stressed.",
      visual: {
        type: "image",
        src: "assets/humanoid_parkour_teaser.png",
        alt: "Humanoid Parkour teaser",
        caption: "Humanoid Parkour Learning using vision and proprioception.",
        source: PARKOUR_URL,
        sourceLabel: "project",
      },
      points: [
        "Its contribution is not motion transfer from human references, but high-difficulty dynamic execution.",
        "It is useful here because it marks the upper end of <strong>agility pressure</strong> that exposes transfer problems quickly.",
      ],
    },
    {
      section: "landscape",
      chapter: "Related Work",
      title: "Classical transfer baselines attack the gap differently",
      subtitle: "ASAP is easiest to value once it is separated from nearby alternatives.",
      visual: {
        type: "compare",
        rows: [
          ["System identification", "Tune simulator parameters", "Strong when the gap is global and interpretable, weaker for local state-dependent bias."],
          ["Domain randomization", "Train for broad robustness", "Improves coverage, but does not aim at the robot's actual measured bias."],
          ["State residuals", "Correct next-state prediction", "Can fit trajectories, but weakens the control-side interpretation of the fix."],
          ["ASAP", "Correct effective action", "Uses real transitions to change the training dynamics seen by the policy."],
        ],
      },
    },
    {
      section: "landscape",
      chapter: "Positioning",
      title: "ASAP's academic position",
      subtitle: "It sits at the intersection of motion imitation, humanoid skill transfer, and data-driven simulator alignment.",
      visual: {
        type: "axis",
        xLeft: "robust locomotion",
        xRight: "expressive whole-body",
        yTop: "real deployment",
        yBottom: "simulation-centric",
        points: [
          ["DeepMimic", 25, 70, "green"],
          ["AMP", 40, 62, "blue"],
          ["HumanPlus", 73, 35, "gold"],
          ["Humanoid Parkour", 82, 52, "purple"],
          ["ASAP", 78, 24, "red"],
        ],
      },
      points: [
        "The paper's value is not a new motion source or a new robot; it is a transfer-specific improvement for agile reference tracking.",
      ],
    },
    {
      section: "landscape",
      chapter: "Positioning",
      title: "The SOTA question here is precise",
      subtitle: "Not 'can the simulator look impressive?', but 'how much expressive control survives on hardware after transfer?'",
      visual: {
        type: "cards",
        cols: 3,
        items: [
          ["Richness", "How expressive is the behavior being attempted?"],
          ["Robustness", "How stable is the policy under changed dynamics?"],
          ["Evidence", "Is the gain visible in closed-loop hardware behavior rather than only in simulation?"],
        ],
      },
    },
    {
      section: "landscape",
      chapter: "Positioning",
      title: "At this point, the paper's burden is clear",
      subtitle: "ASAP only matters if it improves the last step of a pipeline that is already strong everywhere else.",
      visual: {
        type: "compare",
        rows: [
          ["Already strong", "Reference generation", "The field already knows how to obtain rich motions and train convincing simulator trackers."],
          ["Still weak", "Transfer under hidden physics", "Agility still collapses when closed-loop hardware dynamics deviate from the simulator."],
          ["ASAP's job", "Repair the training physics", "The method has to improve transfer without replacing the whole imitation stack."],
        ],
      },
    },

    {
      section: "pretrain",
      chapter: "Reference",
      title: "Stage 1 begins with human motion, not robot demonstrations",
      subtitle: "The reference behavior is constructed before the control problem is solved.",
      visual: {
        type: "pipeline",
        steps: [
          ["Human video", "Collect expressive human motion examples."],
          ["Body reconstruction", "Recover a structured motion representation."],
          ["Cleaning", "Repair and stabilize the motion so it becomes trainable."],
          ["Retargeting", "Map the motion to Unitree G1 geometry and joints."],
        ],
      },
    },
    {
      section: "pretrain",
      chapter: "Reference",
      title: "Reference preparation is not cosmetic",
      subtitle: "It determines whether the policy is asked to imitate something physically meaningful for the robot.",
      visual: {
        type: "image",
        src: "assets/g1_shape.png",
        alt: "Shape fitting and retargeting for Unitree G1",
        caption: "Reference preparation includes shape fitting and robot-specific retargeting.",
        source: PAPER_URL,
        sourceLabel: "paper",
      },
      points: [
        "The robot should inherit the motion's structure, not its human-specific geometry.",
        "A transfer paper only becomes convincing if the stage-1 reference is already sensible.",
      ],
    },
    {
      section: "pretrain",
      chapter: "Policy",
      title: "The tracking policy is phase-aware and feedback-driven",
      subtitle: "It is a controller conditioned on current state and motion timing, not an open-loop playback system.",
      visual: {
        type: "terms",
        cols: 2,
        items: [
          ["Observations", "Base state, joint state, and timing context describe the robot's current situation."],
          ["Phase", "The controller needs timing to distinguish similar poses with different future intent."],
          ["Action", "The output is still robot control, not a motion clip index."],
          ["Critic privilege", "Training may use richer simulator information than deployment while keeping the actor feasible."],
        ],
      },
    },
    {
      section: "pretrain",
      chapter: "Policy",
      title: "The reward balances fidelity and stability",
      subtitle: "The policy must preserve recognizable motion while staying controllable under the simulator's physics.",
      visual: {
        type: "cards",
        cols: 2,
        items: [
          ["Pose / joint tracking", "Keep the body configuration close to the reference."],
          ["Root / velocity tracking", "Preserve global motion, not only local posture."],
          ["Contact behavior", "Encourage the intended support and landing pattern."],
          ["Regularization", "Prevent the controller from exploiting unstable or unrealistic behavior."],
        ],
      },
    },
    {
      section: "pretrain",
      chapter: "Policy",
      title: "Stage 1 already produces a strong simulator controller",
      subtitle: "ASAP does not start from a weak baseline; it starts from a policy that already tracks dynamic motion well in simulation.",
      visual: {
        type: "image",
        src: "assets/motion_tracking.gif",
        alt: "Simulation motion tracking result",
        caption: "Stage 1 produces a competent simulator policy before any real-world alignment begins.",
        source: PROJECT_URL,
        sourceLabel: "project",
      },
      points: [
        "This matters because stage 2 is not about discovering the skill from scratch.",
      ],
    },
    {
      section: "pretrain",
      chapter: "Gap",
      title: "Pretraining alone cannot reveal the missing hardware physics",
      subtitle: "A good simulator policy only proves competence under the simulator's transition function.",
      visual: {
        type: "compare",
        rows: [
          ["What stage 1 learns", "Reference-following control", "It learns how to stabilize the motion under the simulator's rules."],
          ["What stage 1 misses", "Robot-specific transition bias", "It does not observe the real actuator, contact, and linkage effects that distort those rules."],
          ["Why stage 2 exists", "Physics alignment", "Real rollouts are needed to expose the part of the control problem the simulator still hides."],
        ],
      },
    },

    {
      section: "alignment",
      chapter: "Data",
      title: "Real rollouts provide the missing supervision",
      subtitle: "ASAP does not guess the physics gap; it measures it from the pretrained controller's behavior on the real robot.",
      visual: {
        type: "cards",
        cols: 3,
        items: [
          ["State-action-next-state", "Each rollout gives direct transition evidence from hardware."],
          ["Safety-limited budget", "Real data is scarce, so each rollout has to be reused effectively."],
          ["Replay compatibility", "The same transitions can be replayed inside the simulator for paired comparison."],
        ],
      },
    },
    {
      section: "alignment",
      chapter: "Data",
      title: "Replay turns hardware experience into a training target",
      subtitle: "The same state-action pair is evaluated in both worlds, and the disagreement becomes the signal.",
      visual: {
        type: "formula",
        items: [
          ["Real record", "(s<sub>t</sub>, a<sub>t</sub>, s<sub>t+1</sub><sup>real</sup>)"],
          ["Sim replay", "f<sup>sim</sup>(s<sub>t</sub>, a<sub>t</sub>) → s<sub>t+1</sub><sup>sim</sup>"],
          ["Gap", "s<sub>t+1</sub><sup>real</sup> - s<sub>t+1</sub><sup>sim</sup>"],
        ],
      },
      points: [
        "This is the bridge between limited robot data and unlimited simulator-side optimization.",
      ],
    },
    {
      section: "alignment",
      chapter: "Delta Model",
      title: "ASAP models the gap in action space",
      subtitle: "The residual changes what action the simulator effectively sees.",
      visual: {
        type: "formula",
        items: [
          ["Base simulator", "f<sup>sim</sup>(s<sub>t</sub>, a<sub>t</sub>)"],
          ["Residual action", "a<sub>t</sub><sup>corr</sup> = a<sub>t</sub> + π<sup>Δ</sup>(s<sub>t</sub>, a<sub>t</sub>)"],
          ["Target", "f<sup>sim</sup>(s<sub>t</sub>, a<sub>t</sub><sup>corr</sup>) ≈ s<sub>t+1</sub><sup>real</sup>"],
        ],
      },
    },
    {
      section: "alignment",
      chapter: "Delta Model",
      title: "Why action residuals are attractive here",
      subtitle: "They capture hidden physics through the same control interface the policy already uses.",
      visual: {
        type: "compare",
        rows: [
          ["Parameter tuning", "Edit simulator constants", "Clean when the gap is explicit, limited when the bias is local and state-dependent."],
          ["State correction", "Edit predicted next state", "Can fit trajectories while disconnecting the fix from the policy's control signal."],
          ["Action correction", "Edit effective command", "Absorbs hidden dynamics while preserving the controller-facing interface."],
        ],
      },
    },
    {
      section: "alignment",
      chapter: "Fine-tuning",
      title: "The aligned simulator is the key artifact",
      subtitle: "Once the residual is learned and frozen, RL can continue under a more truthful transition model.",
      visual: {
        type: "pipeline",
        steps: [
          ["Collect rollouts", "Run the pretrained policy on hardware."],
          ["Fit delta action", "Make replayed simulator transitions look more like real ones."],
          ["Freeze delta", "Embed the correction into the simulator."],
          ["Fine-tune policy", "Re-optimize the controller under the aligned dynamics."],
        ],
      },
    },
    {
      section: "alignment",
      chapter: "Fine-tuning",
      title: "Fine-tuning is still a control problem, not just a fitting problem",
      subtitle: "The residual corrects one-step dynamics; RL then rebuilds the feedback policy around that change.",
      visual: {
        type: "sequence",
        items: [
          ["Better local transitions", "The simulator stops failing in obviously wrong ways."],
          ["New state distribution", "The policy now visits different states during training."],
          ["Controller adaptation", "RL learns better recovery and timing under those revised dynamics."],
        ],
      },
    },
    {
      section: "alignment",
      chapter: "Fine-tuning",
      title: "Deployment remains operationally simple",
      subtitle: "The final robot still runs a single policy.",
      visual: {
        type: "cards",
        cols: 3,
        items: [
          ["No runtime patch", "The delta model is not needed at deployment time."],
          ["Cleaner operation", "The deployed controller stays architecturally simple."],
          ["Training leverage", "The residual matters because it improved what the policy learned before deployment."],
        ],
      },
    },
    {
      section: "alignment",
      chapter: "Fine-tuning",
      title: "What the residual is likely absorbing",
      subtitle: "The paper is most convincing when the correction is read as structured hardware bias, not as generic noise.",
      visual: {
        type: "cards",
        cols: 3,
        items: [
          ["Actuator lag", "The commanded action arrives differently than the simulator expects."],
          ["Contact bias", "Feet and landings create transition errors that the simulator smooths away."],
          ["Linkage effects", "Ankles and connected structures introduce behavior the rigid model underestimates."],
        ],
      },
    },
    {
      section: "alignment",
      chapter: "Fine-tuning",
      title: "Method summary",
      subtitle: "ASAP is a two-stage learning loop with real-data simulator alignment in the middle.",
      visual: {
        type: "pipeline",
        steps: [
          ["Reference preparation", "Build robot-feasible reference motion from human data."],
          ["Stage 1", "Train a strong simulator tracking policy."],
          ["Real rollouts", "Collect measured hardware transitions."],
          ["Residual alignment", "Learn an action-side correction for simulator replay."],
          ["Stage 2", "Fine-tune the policy in the aligned simulator and deploy it."],
        ],
      },
    },
    {
      section: "evidence",
      chapter: "Design",
      title: "What convincing evidence should look like",
      subtitle: "The claim is only persuasive if the story lines up from local dynamics to final robot behavior.",
      visual: {
        type: "cards",
        cols: 3,
        items: [
          ["First", "Replay should show that the corrected simulator is actually closer to measured hardware transitions."],
          ["Then", "Fine-tuning in that simulator should produce a controller that transfers better across dynamics."],
          ["Finally", "The real robot should preserve more of the intended agile behavior in closed loop."],
        ],
      },
    },

    {
      section: "evidence",
      chapter: "Design",
      title: "The evaluation asks three separate questions",
      subtitle: "Each part of the evidence should support a different layer of the argument.",
      visual: {
        type: "table",
        headers: ["Level", "Question", "Why it matters"],
        rows: [
          ["Replay", "Does the corrected simulator better match measured transitions?", "Checks whether the alignment signal is physically meaningful."],
          ["Cross-simulator", "Does aligned fine-tuning improve transfer under changed dynamics?", "Separates method quality from hardware-only confounds."],
          ["Real robot", "Does more agility survive actual deployment?", "Tests the part of the claim that matters operationally."],
          ["Ablations", "Which ingredients create the gain?", "Ensures the improvement is not just more training or random perturbation."],
        ],
      },
      layout: "wide",
    },
    {
      section: "evidence",
      chapter: "Results",
      title: "The first win is better transition matching",
      subtitle: "Before the controller improves, the simulator itself becomes more faithful to hardware rollouts.",
      visual: {
        type: "metrics",
        cols: 3,
        items: [
          ["Replay error", "↓", "Corrected simulation lands closer to the measured next state."],
          ["Contact timing", "tighter", "Landing events occur closer to the hardware trace."],
          ["Bias structure", "captured", "The residual learns repeatable correction patterns rather than adding generic noise."],
        ],
      },
    },
    {
      section: "evidence",
      chapter: "Results",
      title: "Then closed-loop transfer improves",
      subtitle: "A better simulator matters only if RL under that simulator yields a better controller.",
      visual: {
        type: "image",
        src: "assets/sim2sim.gif",
        alt: "Cross-simulator transfer result",
        caption: "Cross-simulator tests are a clean way to show that aligned fine-tuning improves the controller itself.",
        source: PROJECT_URL,
        sourceLabel: "project",
      },
      points: [
        "This is the step that shows ASAP is more than a replay-fitting trick.",
      ],
    },
    {
      section: "evidence",
      chapter: "Results",
      title: "Hard motions are the right stress test",
      subtitle: "Easy motions can hide a transfer gap that dynamic motions expose immediately.",
      visual: {
        type: "image",
        src: "assets/asap_cr7_frame.png",
        alt: "Representative ASAP target motion frame",
        caption: "Representative target motion from the ASAP project.",
        source: PROJECT_URL,
        sourceLabel: "project",
      },
      points: [
        "Slow, forgiving skills can hide transfer weakness because the controller has time to compensate.",
        "Dynamic balance and explosive motions expose whether the simulator taught the right contact and timing behavior.",
        "That is why ASAP is best judged on expressive, failure-sensitive motions rather than easy averages.",
      ],
    },
    {
      section: "evidence",
      chapter: "Results",
      title: "Real-robot data is scarce enough that data efficiency matters",
      subtitle: "The method is valuable partly because it turns limited hardware rollouts into a reusable simulator-side signal.",
      visual: {
        type: "cards",
        cols: 3,
        items: [
          ["Collection cost", "Each rollout consumes robot time, supervision, and safety budget."],
          ["Coverage limit", "The hardware dataset cannot brute-force every simulator state."],
          ["Reuse value", "Replay lets one rollout support both residual fitting and later policy fine-tuning."],
        ],
      },
    },
    {
      section: "evidence",
      chapter: "Results",
      title: "The main result is better closed-loop agility on hardware",
      subtitle: "The aligned simulator produces a controller that preserves more of the intended motion after transfer.",
      visual: {
        type: "table",
        headers: ["Question", "Pretraining only", "After ASAP"],
        rows: [
          ["Skill preservation", "Hard motions break more often", "More of the intended motion remains executable."],
          ["Recovery quality", "Mismatch compounds into drift or collapse", "The controller recovers better because training saw more realistic failures."],
          ["Deployment complexity", "Single policy", "Still a single policy."],
        ],
      },
    },
    {
      section: "evidence",
      chapter: "Results",
      variant: "hero",
      title: "Recovered agility is the point",
      subtitle: "A transfer method earns its value when the robot keeps the dynamic behavior after contact, landing, and recovery.",
      visual: {
        type: "video",
        src: "https://agile.human2humanoid.com/static/videos/ASAP-Motion-CR7_level1-1080P.mp4",
        cover: true,
        caption: "Official ASAP motion example from the project page.",
        source: PROJECT_URL,
        sourceLabel: "project",
      },
    },
    {
      section: "evidence",
      chapter: "Results",
      title: "Real-world execution is the decisive lens",
      subtitle: "The question is not whether the reference looked good in simulation, but whether the robot still owns the motion after contact and recovery.",
      visual: {
        type: "image",
        src: "assets/rviz.png",
        alt: "Real-world ASAP evaluation",
        caption: "Real-world closed-loop execution is the paper's decisive evidence layer.",
        source: PAPER_URL,
        sourceLabel: "paper",
      },
      points: [
        "This is where simulator alignment becomes meaningful rather than just elegant.",
      ],
    },
    {
      section: "evidence",
      chapter: "Ablations",
      title: "More real data helps until the important mismatch has already been covered",
      subtitle: "The residual benefits from broader rollout coverage, but not all additional data is equally informative.",
      visual: {
        type: "cards",
        cols: 3,
        items: [
          ["Too little data", "The residual only sees a narrow slice of hardware bias."],
          ["Useful range", "Moderate coverage already produces meaningful transfer gains."],
          ["Diminishing returns", "Once the critical failure modes are covered, extra similar rollouts help less."],
        ],
      },
    },
    {
      section: "evidence",
      chapter: "Ablations",
      title: "How the delta is used matters as much as learning it",
      subtitle: "The gain does not come from generic perturbation; it comes from changing training dynamics and letting RL adapt.",
      visual: {
        type: "compare",
        rows: [
          ["No delta", "Simulator stays biased", "Pretraining alone cannot learn around the hidden hardware gap."],
          ["Noise or loose robustness", "Broad perturbation", "This can help robustness but does not reproduce the robot's measured bias."],
          ["Learned delta + fine-tuning", "Aligned simulator", "This is the piece that changes the controller's later closed-loop behavior."],
        ],
      },
    },
    {
      section: "evidence",
      chapter: "Ablations",
      title: "The residual is structured rather than uniform",
      subtitle: "That is part of why the result is plausible as physics alignment rather than just extra exploration.",
      visual: {
        type: "cards",
        cols: 3,
        items: [
          ["Joint concentration", "Some joints matter far more than others for transfer."],
          ["Contact-chain sensitivity", "Errors near the landing and support chain propagate through the whole body."],
          ["Interpretability", "Structured corrections are easier to read as hardware bias than as arbitrary action jitter."],
        ],
      },
    },

    {
      section: "takeaways",
      chapter: "Summary",
      title: "What ASAP adds",
      subtitle: "A real-data action residual that improves the simulator before the final policy is trained for deployment.",
      visual: {
        type: "cards",
        cols: 3,
        items: [
          ["Before", "A strong simulator controller still fails on hardware-specific transition bias."],
          ["During", "Real rollouts teach a residual that makes simulated transitions more realistic."],
          ["After", "The fine-tuned policy preserves more agility while staying simple to deploy."],
        ],
      },
    },
    {
      section: "takeaways",
      chapter: "Summary",
      title: "Where the method is strongest",
      subtitle: "It is most compelling when the policy is already good, the motion is dynamic, and the remaining weakness is transfer.",
      visual: {
        type: "terms",
        cols: 2,
        items: [
          ["Best case", "A simulator policy is competent but brittle under hardware dynamics."],
          ["Best case", "The task contains impacts, timing sensitivity, or whole-body balance events."],
          ["Weaker case", "The simulator is fundamentally wrong everywhere, not just biased in effective control."],
          ["Weaker case", "Real rollouts are too narrow to expose the mismatch the policy actually faces."],
        ],
      },
    },
    {
      section: "takeaways",
      chapter: "Limits",
      title: "Limits and next comparisons",
      subtitle: "ASAP is powerful, but it is not a replacement for broad model quality, rollout coverage, or scaling studies across embodiments.",
      visual: {
        type: "compare",
        rows: [
          ["Coverage limit", "Needs informative rollouts", "The residual cannot fix failure modes it never sees."],
          ["Representation limit", "Action residual is still a bias model", "Some gaps may be too large or too global for this representation."],
          ["Research next step", "Scale and refresh", "A natural next test is iterative rollout refresh across broader motion sets and robots."],
        ],
      },
    },
    {
      section: "takeaways",
      chapter: "Resources",
      title: "Resources",
      subtitle: "Paper, project, code, and the central question to keep from the talk.",
      points: [
        `<strong>Paper.</strong> <a href="${PAPER_URL}" target="_blank" rel="noreferrer">${PAPER_URL}</a>`,
        `<strong>Project.</strong> <a href="${PROJECT_URL}" target="_blank" rel="noreferrer">${PROJECT_URL}</a>`,
        `<strong>Code.</strong> <a href="${CODE_URL}" target="_blank" rel="noreferrer">${CODE_URL}</a>`,
      ],
      visual: {
        type: "quote",
        text: "The paper's lasting idea is simple: if the robot fails because the simulator teaches the wrong physics, improve the simulator first, then retrain the policy.",
      },
    },
  ],
};

const PRESENTER_NOTES_BY_TITLE = {
  ASAP: {
    scriptKo: [
      "이 발표는 ASAP이라는 논문을 다룹니다. 핵심 문제는 시뮬레이터에서는 잘 되던 민첩한 전신 동작이 실제 로봇에서는 물리 차이 때문에 무너진다는 점입니다.",
      "논문의 제안은 실제 롤아웃으로 그 차이를 측정하고, 그 차이를 반영한 시뮬레이터에서 정책을 다시 학습시키는 것입니다.",
    ],
    qaKo: [["이 논문의 한 줄 요약이 뭔가요?", "실제 롤아웃으로 시뮬레이터를 더 실제답게 만든 뒤 그 안에서 정책을 다시 학습시키는 방법입니다."]],
  },
  "What the paper is trying to preserve": {
    scriptKo: [
      "여기서 보셔야 할 것은 단순히 동작이 화려하다는 점이 아닙니다. 착지와 회복까지 포함해서 닫힌 루프에서 동작이 유지되는지가 핵심입니다.",
      "ASAP의 가치는 이런 민첩한 전신 동작이 실제 로봇에서도 살아남도록 만드는 데 있습니다.",
    ],
    qaKo: [["왜 초반에 큰 영상 슬라이드를 넣었나요?", "이 논문이 지키고 싶은 대상이 무엇인지 직관적으로 먼저 보여주기 위해서입니다."]],
  },
  "The bottleneck is no longer motion generation": {
    scriptKo: [
      "이제 병목은 모션을 만드는 것 자체가 아닙니다. 사람 모션 복원과 imitation learning으로 시뮬레이터 안에서는 꽤 풍부한 동작을 만들 수 있습니다.",
      "진짜 어려운 부분은 그 풍부한 동작이 실제 하드웨어에서 닫힌 루프로 유지되느냐입니다.",
    ],
    qaKo: [["왜 motion generation보다 transfer를 강조하나요?", "이 논문이 기여하는 지점이 새로운 모션 생성이 아니라 실제 실행에서의 물리 정렬이기 때문입니다."]],
  },
  "Core mechanism": {
    scriptKo: [
      "이 슬라이드가 방법의 핵심입니다. 실제 롤아웃으로 시뮬레이터와 현실의 차이를 보고, 액션 residual로 시뮬레이터 입력을 보정합니다.",
      "그 다음 그 보정된 시뮬레이터 안에서 정책을 다시 fine-tuning 하고, 최종 배포는 정책 하나만 사용합니다.",
    ],
    qaKo: [["왜 식 대신 파이프라인 figure를 앞에 놨나요?", "최종 발표에서는 메커니즘의 전체 구조를 먼저 잡아주는 것이 이해에 더 효과적이기 때문입니다."]],
  },
  "Why this problem matters now": {
    scriptKo: [
      "최근 연구들은 reference motion, whole-body control, perception이 모두 빠르게 강해졌습니다. 그래서 남은 병목이 transfer 쪽으로 더 선명하게 보입니다.",
      "ASAP은 그 중에서도 마지막 인터페이스, 즉 정책과 실제 하드웨어 물리의 불일치에 집중합니다.",
    ],
    qaKo: [["왜 지금 이 문제가 더 중요해졌나요?", "나머지 스택이 강해질수록 마지막 transfer 병목이 상대적으로 더 지배적이기 때문입니다."]],
  },
  "Agile whole-body skills expose mismatch early": {
    scriptKo: [
      "민첩한 전신 동작은 작은 물리 오차도 바로 드러냅니다. 착지 타이밍, actuation delay, hidden compliance가 짧은 구간 안에 모두 압축되어 있기 때문입니다.",
      "그래서 이런 동작은 transfer 방법의 품질을 보기 위한 좋은 스트레스 테스트가 됩니다.",
    ],
    qaKo: [["왜 특히 agile skill에서 mismatch가 잘 드러나나요?", "오차를 흡수할 시간과 안정 여유가 적어서 작은 차이도 바로 실패로 이어지기 때문입니다."]],
  },
  "A useful reading frame for this literature": {
    scriptKo: [
      "이 분야를 볼 때는 네 가지 축이 유용합니다. motion source가 무엇인지, policy objective가 무엇인지, transfer를 어떻게 다루는지, 그리고 real evidence가 얼마나 강한지입니다.",
      "이 프레임으로 보면 ASAP이 어디에 기여하는지 더 명확해집니다.",
    ],
    qaKo: [["이 슬라이드가 왜 필요한가요?", "관련 연구를 하나의 동일한 기준으로 읽어야 ASAP의 위치와 가치가 명확해지기 때문입니다."]],
  },
  "DeepMimic established the imitation-learning template": {
    scriptKo: [
      "DeepMimic은 reference motion을 RL로 물리 기반 제어로 바꾸는 고전적인 틀을 만든 논문입니다.",
      "ASAP의 1단계 pretraining도 큰 틀에서는 이 계보 위에 있다고 보시면 됩니다.",
    ],
    qaKo: [["DeepMimic과 ASAP의 차이는 뭔가요?", "DeepMimic은 주로 imitation template를 세운 반면, ASAP은 그 이후 transfer gap을 줄이는 데 초점이 있습니다."]],
  },
  "AMP made motion priors a first-class control signal": {
    scriptKo: [
      "AMP는 스타일이나 동작 prior를 손으로 다 설계하기보다 데이터로부터 학습된 motion prior로 제어를 유도했다는 점이 중요합니다.",
      "ASAP과 직접 같은 문제를 푸는 것은 아니지만, 손설계 대신 학습된 구조를 활용한다는 점에서 맥락이 이어집니다.",
    ],
    qaKo: [["AMP가 여기서 왜 중요하죠?", "이 분야가 reward handcrafting에서 learned prior 쪽으로 이동했다는 흐름을 보여주기 때문입니다."]],
  },
  "HumanPlus highlights real humanoid imitation and deployment": {
    scriptKo: [
      "HumanPlus는 사람 행동을 실제 humanoid로 가져가는 deployment 관점에서 인상적인 사례입니다.",
      "ASAP과 비교하면 behavior source와 real deployment 맥락은 강하지만, simulator alignment 자체가 핵심은 아닙니다.",
    ],
    qaKo: [["HumanPlus와 ASAP은 경쟁 관계인가요?", "직접적인 대체재라기보다 서로 다른 축에서 real humanoid capability를 보여주는 연구에 가깝습니다."]],
  },
  "Humanoid Parkour pushes dynamic task difficulty from another direction": {
    scriptKo: [
      "Humanoid Parkour는 사람 reference transfer라기보다, 높은 난도의 dynamic task를 humanoid가 얼마나 수행할 수 있는지를 보여주는 연구입니다.",
      "여기서는 민첩성이 커질수록 transfer 문제가 더 가혹해진다는 점을 보여주는 기준점으로 읽을 수 있습니다.",
    ],
    qaKo: [["왜 parkour류 연구를 같이 보나요?", "민첩성의 상한이 올라갈수록 transfer gap이 얼마나 중요한지 더 잘 보이기 때문입니다."]],
  },
  "Classical transfer baselines attack the gap differently": {
    scriptKo: [
      "전통적인 baseline은 system identification, domain randomization, state residual처럼 각기 다른 방식으로 gap을 줄이려 합니다.",
      "ASAP의 차별점은 실제 rollout에서 얻은 bias를 action space에서 반영해 training dynamics를 바꾼다는 점입니다.",
    ],
    qaKo: [["ASAP이 baseline 대비 가장 다른 점은 뭔가요?", "측정된 실제 bias를 action residual로 학습하고 그걸 simulator 안에 넣어 RL을 다시 돌린다는 점입니다."]],
  },
  "ASAP's academic position": {
    scriptKo: [
      "이 슬라이드는 ASAP의 학계 포지셔닝을 한 번에 보여줍니다. expressive whole-body 쪽에 있으면서도 real deployment 쪽으로 더 올라가려는 시도입니다.",
      "즉, 예쁜 simulation만이 아니라 실제 전이된 agility를 보겠다는 입장입니다.",
    ],
    qaKo: [["이 포지셔닝 그림은 정량 결과인가요?", "정량이라기보다 문헌 지형을 직관적으로 정리한 발표용 positioning map입니다."]],
  },
  "The SOTA question here is precise": {
    scriptKo: [
      "여기서의 SOTA 질문은 단순하지 않습니다. 시뮬레이터에서 멋져 보이느냐가 아니라, 그 expressive control이 실제 하드웨어까지 얼마나 살아남느냐입니다.",
      "그래서 richness, robustness, real evidence를 함께 봐야 합니다.",
    ],
    qaKo: [["왜 SOTA를 단일 metric으로 보지 않나요?", "이 문제는 표현력과 전이성, 그리고 실제 증거를 함께 봐야 의미가 있기 때문입니다."]],
  },
  "At this point, the paper's burden is clear": {
    scriptKo: [
      "여기까지 오면 이 논문의 burden이 분명합니다. 이미 강한 imitation stack을 통째로 바꾸는 것이 아니라, 마지막 transfer 병목을 정말 줄였는지를 보여줘야 합니다.",
      "즉, contribution은 넓기보다 좁고 정확해야 합니다.",
    ],
    qaKo: [["이 논문의 claim을 어디까지 받아들여야 하나요?", "전체 humanoid stack의 혁신이라기보다 transfer-specific improvement로 읽는 것이 가장 정확합니다."]],
  },
  "Stage 1 begins with human motion, not robot demonstrations": {
    scriptKo: [
      "1단계는 사람 motion에서 출발합니다. 먼저 human video나 reconstruction으로 동작을 얻고, 그걸 robot reference로 바꾸는 과정이 선행됩니다.",
      "즉 ASAP은 reference sourcing을 대체하는 논문이 아닙니다.",
    ],
    qaKo: [["왜 robot demo가 아니라 human motion에서 시작하나요?", "목표가 더 풍부하고 자연스러운 whole-body behavior를 가져오는 데 있기 때문입니다."]],
  },
  "Reference preparation is not cosmetic": {
    scriptKo: [
      "shape fitting과 retargeting은 단순한 전처리가 아닙니다. robot이 실제로 따라갈 수 있는 reference를 만드는 핵심 단계입니다.",
      "이 단계가 허술하면 뒤의 transfer 논의도 설득력이 약해집니다.",
    ],
    qaKo: [["reference quality가 transfer에도 영향을 주나요?", "네. 따라가야 할 target 자체가 robot-feasible해야 이후 controller와 transfer 분석이 의미를 갖습니다."]],
  },
  "The tracking policy is phase-aware and feedback-driven": {
    scriptKo: [
      "이 policy는 단순 playback이 아니라 feedback controller입니다. 그리고 같은 자세라도 motion phase가 다르면 의미가 달라지기 때문에 phase 정보가 중요합니다.",
      "특히 jump나 landing처럼 비대칭적인 동작에서 이 timing 정보가 핵심입니다.",
    ],
    qaKo: [["phase 정보가 꼭 필요한가요?", "동일한 pose라도 문맥이 다르면 다른 action이 필요하므로 phase conditioning이 도움이 됩니다."]],
  },
  "The reward balances fidelity and stability": {
    scriptKo: [
      "reward는 reference fidelity와 physical stability를 함께 잡습니다. pose만 맞춘다고 끝나는 것이 아니라 root motion, contact, regularization도 필요합니다.",
      "즉 보기 좋은 imitation과 제어 가능한 imitation을 동시에 맞춰야 합니다.",
    ],
    qaKo: [["왜 reward가 이렇게 여러 항으로 구성되나요?", "whole-body tracking은 자세만 맞춘다고 안정해지지 않아서 물리적 안정 항이 함께 필요하기 때문입니다."]],
  },
  "Stage 1 already produces a strong simulator controller": {
    scriptKo: [
      "중요한 점은 stage 1만으로도 simulator 안에서는 이미 꽤 강한 controller가 나온다는 것입니다.",
      "그래서 stage 2는 skill discovery가 아니라 transfer repair 단계로 이해하는 것이 맞습니다.",
    ],
    qaKo: [["왜 pretrained policy가 강해야 하나요?", "그래야 실제 rollout이 informative해지고, stage 2가 transfer 문제 자체에 집중할 수 있습니다."]],
  },
  "Pretraining alone cannot reveal the missing hardware physics": {
    scriptKo: [
      "아무리 simulator에서 잘해도 hardware-specific physics는 드러나지 않습니다. 그 policy는 결국 simulator의 transition function 아래에서만 최적화된 것이기 때문입니다.",
      "그래서 실제 rollout이 반드시 필요합니다.",
    ],
    qaKo: [["simulator 성능이 높으면 real에서도 어느 정도 되지 않나요?", "어느 정도는 되지만, 민첩한 동작에서는 작은 물리 오차가 빠르게 누적돼 실패로 이어질 수 있습니다."]],
  },
  "Real rollouts provide the missing supervision": {
    scriptKo: [
      "실제 rollout은 바로 그 missing supervision입니다. state, action, next state를 통해 하드웨어가 simulator와 어떻게 다른지를 직접 보여줍니다.",
      "ASAP은 이 데이터를 아주 비싸고 중요한 신호로 다룹니다.",
    ],
    qaKo: [["왜 real data를 직접 policy training보다 simulator alignment에 쓰나요?", "실제 데이터는 비싸기 때문에, simulator 안에서 반복 활용할 수 있는 형태로 바꾸는 편이 효율적이기 때문입니다."]],
  },
  "Replay turns hardware experience into a training target": {
    scriptKo: [
      "같은 state-action 쌍을 simulator에 replay하면 real next state와 직접 비교할 수 있습니다.",
      "이 비교가 바로 delta action model을 학습시키는 target이 됩니다.",
    ],
    qaKo: [["왜 replay가 중요하죠?", "제한된 real rollout을 simulator-side supervision으로 바꿔 반복 사용할 수 있게 해주기 때문입니다."]],
  },
  "ASAP models the gap in action space": {
    scriptKo: [
      "ASAP은 gap을 state가 아니라 action space에서 모델링합니다. 즉, simulator가 실제로는 다른 effective action을 본다고 생각하는 관점입니다.",
      "이렇게 하면 policy interface를 유지한 채로 물리 차이를 흡수할 수 있습니다.",
    ],
    qaKo: [["왜 state residual이 아니라 action residual인가요?", "controller가 원래 사용하는 제어 인터페이스를 유지하면서 hidden physics를 반영하기 쉽기 때문입니다."]],
  },
  "Why action residuals are attractive here": {
    scriptKo: [
      "action residual의 장점은 local하고 state-dependent한 bias를 제어 입력 쪽에서 바로 흡수할 수 있다는 점입니다.",
      "반면 parameter tuning은 너무 전역적일 수 있고, state correction은 제어 관점의 해석이 약해질 수 있습니다.",
    ],
    qaKo: [["action residual이 만능인가요?", "아니고, 큰 전역 오차에는 한계가 있지만 이 논문이 겨냥한 effective control bias에는 잘 맞습니다."]],
  },
  "The aligned simulator is the key artifact": {
    scriptKo: [
      "이 논문에서 진짜 중요한 artifact는 aligned simulator입니다. residual을 학습한 뒤 그걸 simulator 안에 고정해두고 RL을 다시 돌립니다.",
      "즉 real data는 직접 policy를 끝까지 학습시키는 것이 아니라 simulator를 더 나은 teacher로 만드는 데 쓰입니다.",
    ],
    qaKo: [["왜 delta model보다 aligned simulator를 더 중요하게 보나요?", "최종적으로 controller를 바꾸는 것은 그 simulator 안에서 다시 이루어지는 RL이기 때문입니다."]],
  },
  "Fine-tuning is still a control problem, not just a fitting problem": {
    scriptKo: [
      "여기서 중요한 건 residual fitting이 끝이 아니라는 점입니다. local transition을 고친 뒤, policy는 그 새로운 dynamics 아래에서 다시 feedback behavior를 배워야 합니다.",
      "그래서 ASAP은 identification과 RL adaptation이 결합된 구조로 보는 게 맞습니다.",
    ],
    qaKo: [["그럼 one-step alignment만 잘하면 끝인가요?", "아니요. 그 정렬이 policy의 장기적 closed-loop behavior 개선으로 이어져야 합니다."]],
  },
  "Deployment remains operationally simple": {
    scriptKo: [
      "운용 측면에서 좋은 점은 최종 배포가 단순하다는 것입니다. 실제 로봇에는 policy 하나만 올라갑니다.",
      "delta model은 training-time adapter이고 runtime patch가 아닙니다.",
    ],
    qaKo: [["runtime에 delta model을 같이 쓰면 더 좋지 않나요?", "가능성은 있지만 이 논문은 배포 단순성과 정책 자체의 개선을 더 강조합니다."]],
  },
  "What the residual is likely absorbing": {
    scriptKo: [
      "이 residual이 흡수하는 것은 actuator lag, contact bias, linkage effect 같은 구조적 오차라고 해석할 수 있습니다.",
      "특히 ankle-contact chain 쪽에서 이런 차이가 크게 나타날 가능성이 높습니다.",
    ],
    qaKo: [["정확히 어떤 물리를 배운다고 볼 수 있나요?", "완전한 모델 식별이라기보다, policy에 중요한 hardware bias를 action-side에서 흡수한다고 보는 게 적절합니다."]],
  },
  "Method summary": {
    scriptKo: [
      "정리하면, 사람 motion으로 tracker를 pretrain하고, 실제 rollout으로 simulator를 align한 뒤, 그 aligned simulator에서 policy를 다시 fine-tune하는 구조입니다.",
      "즉, real data는 직접 skill을 처음부터 배우게 하는 것이 아니라 transfer loop를 고치는 데 쓰입니다.",
    ],
    qaKo: [["이 방법의 핵심 단계 하나만 고르라면?", "real rollout으로 simulator를 align하고 그 안에서 RL을 다시 돌리는 단계입니다."]],
  },
  "What convincing evidence should look like": {
    scriptKo: [
      "설득력 있는 증거는 순서가 있습니다. 먼저 local dynamics matching이 보여야 하고, 다음에는 cross-dynamics transfer 개선이 보여야 하며, 마지막에 real robot closed-loop improvement가 보여야 합니다.",
      "이 순서를 만족해야 논문 전체 논리가 단단해집니다.",
    ],
    qaKo: [["왜 evidence의 순서를 강조하나요?", "결과가 좋아 보이는 것만으로는 부족하고, 왜 좋아졌는지까지 이어져야 설득력이 생기기 때문입니다."]],
  },
  "The evaluation asks three separate questions": {
    scriptKo: [
      "평가는 세 층으로 나뉩니다. replay에서 dynamics matching이 되는지, cross-simulator transfer가 좋아지는지, 실제 로봇에서 agility가 더 살아남는지입니다.",
      "각 실험은 서로 다른 질문에 답합니다.",
    ],
    qaKo: [["세 평가를 다 해야 하나요?", "네. 하나만 보면 fitting인지, transfer improvement인지, real value인지 구분이 어렵습니다."]],
  },
  "The first win is better transition matching": {
    scriptKo: [
      "첫 번째 성공은 corrected simulator가 실제 transition에 더 가까워진다는 것입니다.",
      "이 단계가 있어야 뒤의 policy improvement도 단순 우연이 아니라는 해석이 가능합니다.",
    ],
    qaKo: [["replay matching이 좋아졌다고 real transfer도 좋아진다고 볼 수 있나요?", "직접 동일하진 않지만, aligned simulator가 의미 있는 방향으로 바뀌었다는 첫 증거가 됩니다."]],
  },
  "Then closed-loop transfer improves": {
    scriptKo: [
      "그 다음 중요한 것은 closed-loop transfer입니다. aligned simulator에서 다시 학습한 policy가 다른 dynamics에서도 더 잘 버티는지를 봅니다.",
      "여기서야 비로소 controller 자체가 좋아졌다고 말할 수 있습니다.",
    ],
    qaKo: [["왜 sim-to-sim 결과도 보나요?", "hardware만 보면 confound가 많아서, dynamics shift 하에서 controller improvement를 더 깨끗하게 보기 위해서입니다."]],
  },
  "Hard motions are the right stress test": {
    scriptKo: [
      "hard motion이 중요한 이유는 쉬운 동작에서는 transfer gap이 잘 안 보이기 때문입니다.",
      "점프나 explosive motion처럼 작은 착지 오차가 전체 실패로 이어지는 동작에서 방법의 차이가 명확해집니다.",
    ],
    qaKo: [["왜 평균 성능보다 hard motion을 더 봐야 하나요?", "이 논문이 겨냥하는 물리 오차는 바로 그런 failure-sensitive motion에서 가장 잘 드러나기 때문입니다."]],
  },
  "Real-robot data is scarce enough that data efficiency matters": {
    scriptKo: [
      "실제 로봇 데이터는 비싸고 안전 제약도 큽니다. 그래서 적은 rollout으로 많은 학습 가치를 뽑아내는 구조가 중요합니다.",
      "ASAP은 replay와 aligned simulation을 통해 이 효율을 확보합니다.",
    ],
    qaKo: [["real rollout을 더 많이 모으면 그냥 해결되지 않나요?", "일부는 그렇지만 비용이 너무 크기 때문에, 적은 데이터로 simulator를 개선하는 방향이 실용적입니다."]],
  },
  "The main result is better closed-loop agility on hardware": {
    scriptKo: [
      "핵심 결과는 결국 여기입니다. ASAP을 거친 policy가 실제 로봇에서 더 많은 agile motion을 유지합니다.",
      "즉 논문의 가치는 simulation 안이 아니라 deployment 결과에서 평가해야 합니다.",
    ],
    qaKo: [["결국 한 문장 결과는 뭔가요?", "실제 하드웨어에서 민첩한 전신 동작이 더 잘 살아남습니다."]],
  },
  "Recovered agility is the point": {
    scriptKo: [
      "이 히어로 슬라이드는 결과를 직관적으로 보여주기 위한 장면입니다. transfer 방법의 성패는 동작의 style이 아니라, 접촉 이후에도 그 동작이 계속 살아 있느냐로 봐야 합니다.",
      "ASAP은 바로 그 회복된 agility를 목표로 합니다.",
    ],
    qaKo: [["이 슬라이드에서 무엇을 집중해서 봐야 하나요?", "동작이 시작되는 순간보다 착지와 회복 구간에서 얼마나 안정적으로 이어지는지를 보시면 됩니다."]],
  },
  "Real-world execution is the decisive lens": {
    scriptKo: [
      "real-world execution이 결정적이라는 말은, 시뮬레이터에서 좋아 보이는 것만으로는 논문이 완성되지 않는다는 뜻입니다.",
      "닫힌 루프에서 실제 로봇이 그 행동을 끝까지 소유하느냐가 최종 판단 기준입니다.",
    ],
    qaKo: [["왜 real-world closed loop를 그렇게 강조하나요?", "이 논문이 해결하려는 문제가 본질적으로 simulator-to-real transfer 문제이기 때문입니다."]],
  },
  "More real data helps until the important mismatch has already been covered": {
    scriptKo: [
      "real data는 많을수록 무조건 좋은 것이 아니라, 중요한 mismatch를 얼마나 덮느냐가 핵심입니다.",
      "결정적인 failure mode를 이미 봤다면 이후에는 수익 체감이 생길 수 있습니다.",
    ],
    qaKo: [["데이터가 많으면 계속 좋아지지 않나요?", "좋아지긴 하지만 중요한 mismatch coverage가 끝나면 증가폭은 줄어드는 경향이 있습니다."]],
  },
  "How the delta is used matters as much as learning it": {
    scriptKo: [
      "delta를 학습하는 것만으로는 부족하고, 그걸 어떻게 쓰느냐가 중요합니다.",
      "ASAP의 포인트는 noise처럼 섞는 게 아니라 simulator dynamics를 바꾸고 그 안에서 RL을 다시 한다는 데 있습니다.",
    ],
    qaKo: [["그냥 noise나 robustness training으로는 안 되나요?", "일반적 robustness는 도와줄 수 있지만, 측정된 실제 bias를 정확히 반영하진 못합니다."]],
  },
  "The residual is structured rather than uniform": {
    scriptKo: [
      "residual이 모든 관절에 균일하게 걸리는 게 아니라 특정 부위에 집중된다는 점이 중요합니다.",
      "이건 모델이 random jitter가 아니라 구조적인 hardware bias를 배우고 있다는 해석을 가능하게 합니다.",
    ],
    qaKo: [["이 residual의 구조성이 왜 중요한가요?", "그 자체가 learned correction이 물리적으로 의미 있는 방향일 가능성을 높여주기 때문입니다."]],
  },
  "What ASAP adds": {
    scriptKo: [
      "요약하면 ASAP이 더하는 것은 real-data action residual을 통해 simulator를 개선하고, 그 simulator에서 policy를 다시 학습시키는 고리입니다.",
      "즉 새로운 모션 생성이 아니라 transfer-aware training loop가 핵심입니다.",
    ],
    qaKo: [["ASAP의 novelty를 한 줄로 다시 말하면?", "실제 롤아웃으로 simulator를 보정한 뒤 그 안에서 정책을 다시 학습시키는 transfer loop입니다."]],
  },
  "Where the method is strongest": {
    scriptKo: [
      "이 방법은 simulator policy가 이미 강하지만 hardware transfer가 취약할 때 가장 잘 맞습니다.",
      "특히 impact와 balance sensitivity가 큰 dynamic whole-body motion에서 가장 설득력이 큽니다.",
    ],
    qaKo: [["어떤 문제에 ASAP을 바로 써볼 만한가요?", "simulator에서는 잘 되지만 real hardware에서 깨지는 dynamic humanoid tracking 문제입니다."]],
  },
  "Limits and next comparisons": {
    scriptKo: [
      "물론 한계도 분명합니다. rollout coverage가 너무 좁으면 residual이 볼 수 있는 mismatch도 제한되고, action residual 표현 자체의 한계도 있습니다.",
      "다음 단계는 더 다양한 모션, 더 많은 embodiment, 그리고 iterative refresh 구조를 보는 것입니다.",
    ],
    qaKo: [["다음으로 가장 중요한 후속 실험은 뭔가요?", "더 다양한 motion set과 반복적 real-data refresh가 가능한지 보는 것입니다."]],
  },
  Resources: {
    scriptKo: [
      "마지막으로 논문, 프로젝트, 코드 링크입니다. 발표에서 가져가실 핵심은, 실제 물리 차이가 문제라면 simulator를 먼저 더 실제답게 만들고 그 안에서 정책을 다시 가르쳐야 한다는 점입니다.",
      "이 아이디어가 ASAP의 가장 오래 남는 메시지라고 생각합니다.",
    ],
    qaKo: [["발표를 마치며 한 줄 takeaway는?", "실패 원인이 simulator physics라면, policy보다 먼저 simulator를 더 실제답게 가르쳐야 합니다."]],
  },
};

window.ASAP_DECK.slides = window.ASAP_DECK.slides.map((slide) => ({
  ...slide,
  ...(PRESENTER_NOTES_BY_TITLE[slide.title] || {}),
}));
