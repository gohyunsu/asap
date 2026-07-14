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
