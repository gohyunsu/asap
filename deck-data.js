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
      title: "Target of transfer preservation",
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
      title: "Hardware physics as the remaining transfer bottleneck",
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
      title: "Why transfer alignment matters now",
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
      title: "Analytical frame for related work",
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
      title: "ASAP in the research landscape",
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
      title: "A precise criterion for SOTA",
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
      title: "Contribution boundary of the paper",
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
      title: "Human motion as the reference source",
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
      title: "Reference preparation and physical feasibility",
      subtitle: "It determines whether the policy is asked to imitate something physically meaningful for the robot.",
      visual: {
        type: "image",
        src: "assets/asap_figure2_retargeting.png",
        alt: "ASAP Figure 2 retargeting pipeline",
        caption: "Figure 2 from the paper: human-video retargeting to Unitree G1.",
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
      title: "A strong stage-1 simulator baseline",
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
      title: "Simulator competence is limited to simulator physics",
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
      title: "Real rollouts as alignment supervision",
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
      title: "Replay as paired transition supervision",
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
      title: "Action-space modeling of the physics gap",
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
      title: "The aligned simulator as the core artifact",
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
      title: "Fine-tuning under aligned physics",
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
      title: "Deployment remains a single-policy system",
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
      title: "Two-stage method summary",
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
      title: "Evidence required by the claim",
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
      title: "Three evaluation questions",
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
      title: "Improved transition matching",
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
      title: "Improved closed-loop transfer",
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
      title: "Hard motions as the proper stress test",
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
      title: "Why data efficiency matters",
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
      title: "Improved closed-loop agility on hardware",
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
      title: "Recovered agility in real execution",
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
      title: "Real-world execution as final evidence",
      subtitle: "The question is not whether the reference looked good in simulation, but whether the robot still owns the motion after contact and recovery.",
      visual: {
        type: "image",
        src: "assets/asap_figure8_real_jump.png",
        alt: "ASAP Figure 8 real-world forward jump",
        caption: "Figure 8 from the paper: real-world forward-jump deployment on Unitree G1.",
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
      title: "Additional real data helps until coverage saturates",
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
      title: "How delta usage affects the gain",
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
      title: "The residual reflects structured bias",
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
      title: "ASAP's main contribution",
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
      title: "Where the method is most effective",
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

const PRESENTER_DETAIL_BY_TITLE = {
  ASAP: `여기서 agile whole-body skill은 보행처럼 반복적인 저난도 동작이 아니라, 점프·킥·착지처럼 전신 협응과 접촉 타이밍이 중요한 동작을 뜻합니다. Unitree G1은 이 논문이 실제 전이를 검증하는 대상 로봇이고, 발표에서는 '어떤 로봇에 어떤 종류의 동작을 옮기려는가'를 먼저 분명히 해두는 것이 좋습니다.`,
  "What the paper is trying to preserve": `closed-loop execution은 한 번 모션을 재생하는 것이 아니라, 현재 상태를 계속 읽으면서 다음 action을 다시 계산하는 제어를 뜻합니다. 그래서 style보다 더 중요한 기준은 착지 후 회복, 다음 동작으로의 연결, 균형 재획득 같은 연속적 안정성입니다.`,
  "The bottleneck is no longer motion generation": `reference motion reconstruction은 영상이나 모션 데이터에서 사람 동작을 구조화된 시퀀스로 복원하는 과정입니다. 즉 이 슬라이드는 '행동의 원본을 만드는 기술'은 이미 많이 발전했고, 남은 병목이 실제 물리와의 불일치라는 점을 짚는 역할을 합니다.`,
  "Core mechanism": `action residual은 정책이 낸 action에 상태 의존적인 보정값을 더해, simulator가 실제 하드웨어에 더 가까운 결과를 내도록 만드는 모듈입니다. fine-tuning은 그 보정된 물리 안에서 정책을 다시 학습시키는 단계이고, 최종 배포는 이 재학습된 정책 하나로 끝납니다.`,
  "Why this problem matters now": `이 슬라이드의 stack은 최근 humanoid 연구가 어디까지 성숙했는지를 보여줍니다. reference motion, whole-body control, deployment 준비가 강해질수록 오히려 마지막 interface인 simulator physics와 hardware physics의 차이가 더 눈에 띄게 남습니다.`,
  "Agile whole-body skills expose mismatch early": `impact timing은 접촉이 한 프레임만 늦어도 다음 상태가 완전히 달라지는 현상을 말합니다. hidden compliance는 발, 발목, 링크가 시뮬레이터보다 더 유연하게 반응하는 실제 하드웨어 특성이고, 이런 요소가 짧은 시간 안에 겹치면서 mismatch를 확대합니다.`,
  "A useful reading frame for this literature": `motion source는 행동이 어디에서 왔는지, control objective는 정책이 정확히 무엇을 보존하려는지, transfer strategy는 sim-to-real gap을 어떻게 다루는지, real evidence는 무엇을 성공 증거로 볼지를 뜻합니다. 이 네 축으로 읽으면 관련 연구가 한눈에 정리됩니다.`,
  "DeepMimic established the imitation-learning template": `reference-tracking RL template은 목표 모션을 주고, 그 모션을 따라가도록 reward를 설계한 뒤 RL로 폐루프 정책을 학습시키는 전형적인 구조입니다. DeepMimic은 이 구조를 동적 전신 동작에 설득력 있게 보여준 대표 사례입니다.`,
  "AMP made motion priors a first-class control signal": `motion prior는 '어떤 동작이 자연스러운가'에 대한 학습된 선호라고 볼 수 있습니다. AMP는 discriminator 기반 보상으로 이 prior를 정책 학습에 직접 연결했고, 결과적으로 손으로 일일이 style reward를 짜지 않아도 richer behavior를 만들 수 있음을 보였습니다.`,
  "HumanPlus highlights real humanoid imitation and deployment": `이 슬라이드에서 deployment story라는 표현은 실제 인간 행동을 로봇에서 실행 가능하게 만드는 전체 시스템 관점을 뜻합니다. ASAP은 그 전체 중에서도 특히 simulator alignment와 transfer 메커니즘을 더 정밀하게 다루는 쪽에 가깝습니다.`,
  "Humanoid Parkour pushes dynamic task difficulty from another direction": `agility pressure는 과제가 요구하는 동적 난도, 즉 속도·충격·장기 contact sequence가 controller를 얼마나 몰아붙이는지를 뜻합니다. Parkour류 문제는 이 압력을 크게 높여 transfer 문제가 빨리 드러나게 만듭니다.`,
  "Classical transfer baselines attack the gap differently": `system identification은 질량·마찰 같은 simulator parameter를 맞추는 접근이고, domain randomization은 다양한 파라미터 분포에서 정책을 훈련해 넓게 버티게 만드는 접근입니다. state residual은 상태 예측 오차를 직접 보정하지만, ASAP은 제어 입력이 실제로 어떻게 왜곡되는지를 더 직접적으로 다룹니다.`,
  "ASAP's academic position": `이 포지셔닝 맵은 정밀한 정량 그래프가 아니라 학계 지형을 읽기 위한 개념도입니다. x축은 locomotion 중심인지 expressive whole-body 중심인지, y축은 simulation-centric인지 real deployment 중심인지에 대한 상대적 위치를 뜻합니다.`,
  "The SOTA question here is precise": `richness는 행동의 표현력과 다양성, robustness는 dynamics가 바뀌어도 policy가 버티는 정도, evidence는 그 이득이 실제 하드웨어 폐루프 실행까지 이어지는지를 뜻합니다. 이 세 축을 분리하지 않으면 서로 다른 논문을 같은 기준으로 비교하기 어렵습니다.`,
  "At this point, the paper's burden is clear": `burden이라는 표현은 이 논문이 무엇을 반드시 증명해야 하는지를 뜻합니다. 이미 reference generation과 simulator tracking이 강한 상황에서, ASAP은 imitation stack 전체가 아니라 마지막 transfer failure만 정확히 줄였다는 것을 보여줘야 합니다.`,
  "Stage 1 begins with human motion, not robot demonstrations": `body reconstruction은 비디오에서 관절과 신체 구조를 복원해 학습 가능한 모션 표현으로 바꾸는 과정입니다. retargeting은 그 사람 중심 표현을 Unitree G1의 관절 구조와 길이에 맞게 변환하는 단계입니다.`,
  "Reference preparation is not cosmetic": `shape fitting은 인체 형상 모델을 영상에 맞춰 사람의 자세와 체형을 추정하는 과정이고, retargeting은 그 결과를 로봇 관절 공간으로 옮기는 과정입니다. 이 단계가 부정확하면 뒤의 transfer 실패가 physics 문제인지 reference 문제인지 분리할 수 없습니다.`,
  "The tracking policy is phase-aware and feedback-driven": `phase는 현재 motion cycle 안에서 시간이 어디쯤 진행됐는지를 나타내는 신호입니다. feedback-driven이라는 말은 policy가 현재 관절 상태, 속도, 균형 오차를 읽고 그때그때 보정 action을 낸다는 뜻으로, 단순 재생기와 구별됩니다.`,
  "The reward balances fidelity and stability": `pose tracking은 관절 자세를, root tracking은 몸통의 전역 위치와 속도를, contact behavior는 발 지지와 착지 패턴을 맞추는 항입니다. regularization은 과도한 토크나 비현실적 움직임을 억제해 simulator exploit을 막는 역할을 합니다.`,
  "Stage 1 already produces a strong simulator controller": `competent simulator policy라는 말은, 실제 전이만 없을 뿐 simulator 안에서는 이미 동작 구조와 timing을 꽤 잘 유지한다는 뜻입니다. 그래서 stage 2를 새로운 skill discovery가 아니라 transfer repair로 해석할 수 있습니다.`,
  "Pretraining alone cannot reveal the missing hardware physics": `transition function은 현재 state와 action이 다음 state를 어떻게 만드는지를 정의하는 dynamics 자체입니다. simulator 안에서 잘된 정책은 이 함수가 틀렸다는 사실을 스스로 드러내지 못하므로, real rollout이 별도 감독 신호로 필요합니다.`,
  "Real rollouts provide the missing supervision": `state-action-next-state tuple은 제어에서 가장 직접적인 물리 증거입니다. reward보다 더 근본적으로 '같은 명령을 줬을 때 실제 하드웨어가 어떻게 반응했는가'를 보여 주기 때문에 simulator alignment의 교사로 쓰기 적합합니다.`,
  "Replay turns hardware experience into a training target": `replay는 하드웨어에서 모은 transition을 같은 입력으로 simulator에 다시 재생해 paired comparison을 가능하게 하는 절차입니다. 이렇게 하면 policy 차이와 dynamics 차이를 어느 정도 분리해서 볼 수 있습니다.`,
  "ASAP models the gap in action space": `effective action은 정책이 의도한 명령이 실제 하드웨어에서 결과적으로 어떤 입력처럼 작용했는지를 뜻합니다. actuator delay, bandwidth limit, low-level control bias가 있으면 nominal action과 effective action이 달라질 수 있습니다.`,
  "Why action residuals are attractive here": `local state-dependent bias는 특정 상태나 접촉 국면에서만 드러나는 오차를 뜻합니다. 이런 종류의 오차는 전역 파라미터 한두 개를 맞추는 것보다, action residual처럼 상태 조건부 보정으로 다루는 편이 더 자연스러운 경우가 많습니다.`,
  "The aligned simulator is the key artifact": `aligned simulator는 residual을 내장한 뒤 실제와 더 비슷한 transition을 만드는 학습 환경입니다. 핵심은 real data 한 번으로 끝나는 것이 아니라, 그 이후 RL 전 과정을 더 정직한 물리 위에서 반복할 수 있게 된다는 점입니다.`,
  "Fine-tuning is still a control problem, not just a fitting problem": `local transition fit이 좋아진다고 곧바로 장기 폐루프 behavior가 좋아지는 것은 아닙니다. RL 재학습이 필요한 이유는, 보정된 물리 아래에서 recovery timing, contact strategy, state visitation 자체가 다시 최적화되어야 하기 때문입니다.`,
  "Deployment remains operationally simple": `runtime patch가 아니라는 말은, 별도 residual 모듈을 실시간으로 돌리지 않고 최종 정책만 로봇에 배포한다는 뜻입니다. 연구 단계의 복잡함을 runtime으로 넘기지 않는다는 점에서 실용성이 있습니다.`,
  "What the residual is likely absorbing": `actuator lag는 명령과 실제 출력 사이의 시간 지연, contact bias는 지면 접촉 모델 차이, linkage effect는 링크와 관절 체인의 탄성·유격이 만들어내는 오차를 뜻합니다. 논문은 이를 완전한 모델 식별보다 control-relevant correction으로 해석하는 편이 타당합니다.`,
  "Method summary": `이 슬라이드는 파이프라인을 다시 압축해서 기억에 남기기 위한 정리 슬라이드입니다. 핵심 동사는 pretrain, measure, align, fine-tune 네 개로 잡으면 전체 메커니즘을 짧게 복기하기 좋습니다.`,
  "What convincing evidence should look like": `local dynamics matching은 one-step 수준에서 simulator가 실제 transition에 가까워졌는지를 뜻하고, closed-loop improvement는 그 보정이 장기 제어 성능까지 이어졌는지를 뜻합니다. 둘 다 있어야 method claim이 닫힙니다.`,
  "The evaluation asks three separate questions": `replay, cross-simulator, real robot, ablation은 각각 simulator fidelity, controller transferability, 실제 운용 가치, 기여 요소 분해를 담당합니다. 네 결과 층이 합쳐져야 '왜 좋아졌는가'까지 설명할 수 있습니다.`,
  "The first win is better transition matching": `replay error는 실제 next state와 보정된 simulator next state의 차이를 말합니다. contact timing이 tighter해졌다는 것은 착지나 발 접촉 시점이 hardware trace와 더 비슷해졌다는 뜻이고, 이는 민첩한 동작에서 특히 중요합니다.`,
  "Then closed-loop transfer improves": `cross-simulator test는 하드웨어만 볼 때 생기는 변수들을 일부 제거하고, dynamics가 달라져도 aligned fine-tuning이 controller를 더 낫게 만드는지 보는 실험입니다. 즉 residual fitting이 아니라 policy quality 향상을 더 깨끗하게 드러내는 장치입니다.`,
  "Hard motions are the right stress test": `failure-sensitive motion은 작은 timing error나 contact error가 바로 넘어짐으로 이어지는 동작을 말합니다. 점프와 explosive skill은 이런 민감도를 크게 만들어 transfer method의 진짜 차이를 드러냅니다.`,
  "Real-robot data is scarce enough that data efficiency matters": `safety-limited budget은 하드웨어 롤아웃이 장비 손상, 리셋 시간, 감독 비용 때문에 매우 제한적이라는 뜻입니다. replay compatibility는 한번 모은 데이터를 simulator 쪽에서 여러 번 재사용할 수 있게 해주는 성질입니다.`,
  "The main result is better closed-loop agility on hardware": `skill preservation은 원래 의도한 동작 구조가 실제에서도 유지되는지를, recovery quality는 mismatch 이후 자세를 얼마나 빨리 되살리는지를 뜻합니다. deployment complexity가 그대로 single policy라는 점은 실용성 측면의 장점입니다.`,
  "Recovered agility is the point": `이 슬라이드는 정량보다 정성 해석이 더 중요한 hero slide입니다. 회복된 agility는 동작 시작이 아니라 접촉 이후의 자세 회복, 다음 동작으로의 연결, 무너지지 않는 timing에서 읽어야 합니다.`,
  "Real-world execution is the decisive lens": `decisive lens라는 말은 모든 중간 결과가 결국 real-world closed-loop behavior로 수렴해야 한다는 뜻입니다. simulator alignment가 예쁘게 보이는지보다, 실제 로봇이 그 이득을 소유하는지가 결론입니다.`,
  "More real data helps until the important mismatch has already been covered": `coverage는 단순히 데이터 양이 아니라, policy가 실제로 마주치는 중요한 실패 상황을 얼마나 포함했는지를 뜻합니다. 이후 연구로는 failure-focused data collection이나 active rollout selection과 자연스럽게 이어질 수 있습니다.`,
  "How the delta is used matters as much as learning it": `broad perturbation은 여러 오차를 넓게 흩뿌려 robustness를 얻는 방식이고, aligned simulator는 측정된 bias가 simulator transition 안에 구조적으로 반영된 상태를 뜻합니다. ASAP은 후자를 통해 RL이 방향성 있는 적응을 하도록 만듭니다.`,
  "The residual is structured rather than uniform": `structured residual은 모든 관절에 비슷한 noise를 거는 것이 아니라, 특정 관절·특정 국면에 correction이 집중된다는 뜻입니다. 이 구조성은 방법이 임의 흔들기가 아니라 물리적으로 의미 있는 편향을 잡았다는 간접 증거가 됩니다.`,
  "What ASAP adds": `이 슬라이드의 before-during-after 구조는 novelty를 시간축으로 정리한 것입니다. 즉 기존 강한 정책이 어디서 깨졌고, 실제 데이터가 무엇을 가르쳤으며, 그 결과 배포 시 무엇이 달라졌는지를 순서대로 압축합니다.`,
  "Where the method is strongest": `best case는 simulator policy가 이미 competent하지만 hardware dynamics에 brittle한 경우이고, weaker case는 simulator 자체가 전반적으로 틀렸거나 real rollout coverage가 너무 좁은 경우입니다. 이 경계 조건을 솔직히 말해 주는 것이 발표의 rigor를 높입니다.`,
  "Limits and next comparisons": `coverage limit은 residual이 보지 못한 failure mode는 고칠 수 없다는 뜻이고, representation limit은 action residual이 모든 구조적 gap을 표현하진 못한다는 뜻입니다. 자연스러운 다음 단계는 broader motion set과 iterative refresh, 다른 로봇으로의 확장입니다.`,
  Resources: `마지막 quote는 이 논문의 일반화 가능한 메시지를 압축한 문장입니다. simulator가 잘못된 physics를 가르치고 있다면 policy를 탓하기 전에 학습 환경부터 실제답게 만드는 것이 더 효과적일 수 있다는 교훈으로 받아들이면 됩니다.`,
};

const PRESENTER_TITLE_ALIASES = {
  "Target of transfer preservation": "What the paper is trying to preserve",
  "Hardware physics as the remaining transfer bottleneck": "The bottleneck is no longer motion generation",
  "Why transfer alignment matters now": "Why this problem matters now",
  "Analytical frame for related work": "A useful reading frame for this literature",
  "ASAP in the research landscape": "ASAP's academic position",
  "A precise criterion for SOTA": "The SOTA question here is precise",
  "Contribution boundary of the paper": "At this point, the paper's burden is clear",
  "Human motion as the reference source": "Stage 1 begins with human motion, not robot demonstrations",
  "Reference preparation and physical feasibility": "Reference preparation is not cosmetic",
  "A strong stage-1 simulator baseline": "Stage 1 already produces a strong simulator controller",
  "Simulator competence is limited to simulator physics": "Pretraining alone cannot reveal the missing hardware physics",
  "Real rollouts as alignment supervision": "Real rollouts provide the missing supervision",
  "Replay as paired transition supervision": "Replay turns hardware experience into a training target",
  "Action-space modeling of the physics gap": "ASAP models the gap in action space",
  "The aligned simulator as the core artifact": "The aligned simulator is the key artifact",
  "Fine-tuning under aligned physics": "Fine-tuning is still a control problem, not just a fitting problem",
  "Deployment remains a single-policy system": "Deployment remains operationally simple",
  "Two-stage method summary": "Method summary",
  "Evidence required by the claim": "What convincing evidence should look like",
  "Three evaluation questions": "The evaluation asks three separate questions",
  "Improved transition matching": "The first win is better transition matching",
  "Improved closed-loop transfer": "Then closed-loop transfer improves",
  "Hard motions as the proper stress test": "Hard motions are the right stress test",
  "Why data efficiency matters": "Real-robot data is scarce enough that data efficiency matters",
  "Improved closed-loop agility on hardware": "The main result is better closed-loop agility on hardware",
  "Recovered agility in real execution": "Recovered agility is the point",
  "Real-world execution as final evidence": "Real-world execution is the decisive lens",
  "Additional real data helps until coverage saturates": "More real data helps until the important mismatch has already been covered",
  "How delta usage affects the gain": "How the delta is used matters as much as learning it",
  "The residual reflects structured bias": "The residual is structured rather than uniform",
  "ASAP's main contribution": "What ASAP adds",
  "Where the method is most effective": "Where the method is strongest",
};

const PRESENTER_EXTRA_QA_BY_TITLE = {
  ASAP: [
    ["이 방법을 우리 시스템에 옮기려면 최소 무엇이 필요하나요?", "강한 simulator baseline, real rollout logging, 그리고 같은 state-action을 simulator에서 replay할 수 있는 상태 정의가 최소 구성입니다."],
    ["우리 연구와 바로 연결되는 포인트는 뭔가요?", "정책 구조보다 simulator mismatch가 더 큰 병목인지 먼저 분해하라는 점입니다."],
  ],
  "What the paper is trying to preserve": [
    ["비디오에서는 어디를 중점적으로 봐야 하나요?", "공중 자세보다 착지 직후 회복, 발 접촉 안정화, 다음 동작 연결을 보시면 됩니다."],
    ["이 기준은 다른 로봇에도 유효한가요?", "네. embodiment가 달라도 closed-loop recovery를 보는 원칙은 같습니다."],
  ],
  "The bottleneck is no longer motion generation": [
    ["정말 generation 병목은 끝났다고 봐도 되나요?", "완전히 끝났다는 뜻은 아니고, 이 논문 맥락에서는 transfer가 상대적으로 더 큰 병목이라는 뜻입니다."],
    ["generation과 transfer를 실험적으로 어떻게 분리하나요?", "같은 reference와 same pretraining을 고정하고 transfer method만 바꿔 비교하면 됩니다."],
  ],
  "Core mechanism": [
    ["delta model은 policy와 동시에 학습하나요?", "아닙니다. real rollout으로 delta를 먼저 학습하고, 그다음 frozen delta가 들어간 simulator에서 policy를 fine-tune합니다."],
    ["runtime에 delta를 안 쓰는 이유는 뭔가요?", "논문은 adaptation을 policy 자체에 흡수시켜 배포 복잡도를 낮추는 쪽을 택합니다."],
  ],
  "Why this problem matters now": [
    ["왜 지금 humanoid에서 특히 중요하죠?", "표현력 높은 전신 동작이 가능해질수록 실제 물리 mismatch가 더 자주, 더 크게 드러나기 때문입니다."],
    ["locomotion-only 시스템에도 같은 논리가 적용되나요?", "적용되지만, agile whole-body에서 mismatch 노출 속도가 더 빠릅니다."],
  ],
  "Agile whole-body skills expose mismatch early": [
    ["실제로 가장 치명적인 오차는 무엇일 가능성이 크나요?", "착지 타이밍, contact model 오차, actuator bandwidth 한계가 대표적입니다."],
    ["쉬운 모션 평가는 왜 부족하죠?", "차이가 숨겨지기 쉬워 transfer method의 해상도가 떨어지기 때문입니다."],
  ],
  "A useful reading frame for this literature": [
    ["왜 이 네 축으로 정리했나요?", "motion source, objective, transfer strategy, real evidence를 분리해야 문헌 비교가 왜곡되지 않기 때문입니다."],
    ["우리 발표에서 꼭 유지해야 할 축은 무엇인가요?", "transfer strategy와 real evidence 두 축은 반드시 유지하는 편이 좋습니다."],
  ],
  "DeepMimic established the imitation-learning template": [
    ["DeepMimic과 ASAP을 실험적으로 연결하려면?", "같은 tracking template 위에서 transfer module만 바꾸는 ablation이 가장 자연스럽습니다."],
    ["DeepMimic만으로 real transfer가 어려운 이유는 뭔가요?", "hardware-specific bias를 직접 측정하거나 수정하는 단계가 없기 때문입니다."],
  ],
  "AMP made motion priors a first-class control signal": [
    ["AMP prior와 ASAP을 같이 쓸 수 있나요?", "원리상 가능합니다. 더 강한 stage-1 policy 위에 transfer alignment를 덧붙이는 구조가 됩니다."],
    ["AMP가 있으면 reward engineering 문제는 끝난 건가요?", "아니고, style prior가 좋아진 것이지 contact-accurate transfer가 자동 해결되진 않습니다."],
  ],
  "HumanPlus highlights real humanoid imitation and deployment": [
    ["HumanPlus류 파이프라인에도 ASAP을 붙일 수 있나요?", "네. real deployment pipeline 위에 simulator alignment 단계를 추가하는 식으로 결합 가능합니다."],
    ["둘의 차이를 한 문장으로 말하면?", "HumanPlus는 deployment pipeline이 강하고, ASAP은 transfer correction mechanism이 강합니다."],
  ],
  "Humanoid Parkour pushes dynamic task difficulty from another direction": [
    ["Parkour 수준 과제에도 action residual이 충분할까요?", "부분적으로는 유효하지만 perception/planning mismatch까지 크면 추가 구조가 필요할 수 있습니다."],
    ["왜 이 논문을 같이 보나요?", "agility frontier가 올라갈수록 transfer 정렬의 필요성이 커진다는 점을 보여주기 때문입니다."],
  ],
  "Classical transfer baselines attack the gap differently": [
    ["SysID 대신 ASAP이 더 나은 조건은 뭔가요?", "오차가 전역 파라미터 몇 개로 설명되지 않고 상태 의존적으로 드러날 때입니다."],
    ["Domain randomization과 병행할 수 있나요?", "네. robustness를 먼저 확보하고 measured bias alignment를 추가하는 식이 가능합니다."],
  ],
  "ASAP's academic position": [
    ["이 포지셔닝은 주관적이지 않나요?", "정량 그래프는 아니지만, 어떤 축에서 논문을 읽어야 하는지 정리하는 발표용 개념도로는 유효합니다."],
    ["ASAP을 한 분야로 묶으면 어디인가요?", "motion imitation 기반 humanoid transfer method로 두는 것이 가장 정확합니다."],
  ],
  "The SOTA question here is precise": [
    ["왜 질문 정의를 이렇게 좁혀야 하죠?", "richness와 transfer quality를 섞어 비교하면 기여점이 흐려지기 때문입니다."],
    ["이 기준이 질의응답에도 도움이 되나요?", "네. 다른 논문과의 비교 축을 정리해 과대·과소평가를 막아줍니다."],
  ],
  "At this point, the paper's burden is clear": [
    ["이 burden을 만족하려면 어떤 실험이 꼭 필요하죠?", "aligned simulator fidelity, controller transfer improvement, real robot execution 세 층이 필요합니다."],
    ["이 framing이 왜 중요하죠?", "논문이 해결하지 않는 문제를 미리 분리해 과대 해석을 막기 때문입니다."],
  ],
  "Stage 1 begins with human motion, not robot demonstrations": [
    ["왜 human video가 robot demo보다 낫나요?", "표현력과 데이터 규모 면에서 유리하고 고난도 전신 동작을 더 풍부하게 확보할 수 있기 때문입니다."],
    ["그 대신 비용은 뭔가요?", "reconstruction noise와 retargeting 난이도가 커져 cleaning이 필수입니다."],
  ],
  "Reference preparation is not cosmetic": [
    ["이 figure는 paper 원본이 맞나요?", "네. 지금은 paper Figure 2를 직접 사용하고 있고, human video부터 G1 real execution까지의 retargeting 파이프라인을 그대로 보여줍니다."],
    ["여기서 실제로 가장 많이 깨지는 단계는 어디인가요?", "reconstruction noise 정리와 robot-feasible retargeting 단계가 가장 자주 병목이 됩니다."],
  ],
  "The tracking policy is phase-aware and feedback-driven": [
    ["phase 없이도 학습이 가능한가요?", "가능할 수는 있지만, 단일 motion tracking에서는 phase가 목표 문맥을 아주 싸게 제공해 안정성을 높입니다."],
    ["feedback-driven이라는 점이 왜 중요하죠?", "real hardware에서는 open-loop playback이 곧바로 무너지기 쉽기 때문입니다."],
  ],
  "The reward balances fidelity and stability": [
    ["reward 항이 많으면 tuning이 어려워지지 않나요?", "맞습니다. 그래서 learned prior가 중요하지만, humanoid tracking에서는 물리 안정 항을 여전히 완전히 뺄 수 없습니다."],
    ["실전에서 먼저 의심할 항은 뭔가요?", "root/velocity와 contact 관련 항이 약하면 자세만 비슷하고 제어는 무너지는 경우가 많습니다."],
  ],
  "Stage 1 already produces a strong simulator controller": [
    ["stage 1이 약하면 ASAP도 효과가 떨어지나요?", "네. informative한 real rollout을 얻으려면 baseline policy가 어느 정도 동작 구조를 유지해야 합니다."],
    ["strong baseline 위에서만 의미가 있나요?", "상대적으로 그렇습니다. 이 논문은 skill discovery보다 transfer repair에 초점이 있기 때문입니다."],
  ],
  "Pretraining alone cannot reveal the missing hardware physics": [
    ["센서를 더 달면 해결되나요?", "일부 관측은 늘릴 수 있지만, simulator dynamics 자체가 틀리면 관측 확장만으로는 충분하지 않을 수 있습니다."],
    ["simulator를 더 정교하게 만들면 ASAP이 불필요해지나요?", "이론상 가능하지만, 실제로 모든 bias를 사전에 모델링하기 어려워 data-driven alignment가 여전히 유용합니다."],
  ],
  "Real rollouts provide the missing supervision": [
    ["real rollout은 얼마나 많아야 하나요?", "절대량보다 mismatch를 대표하는 informative rollout이 더 중요하다는 것이 논문 메시지입니다."],
    ["mocap이 꼭 필요한가요?", "정밀한 state pairing에는 도움이 크지만, 시스템에 따라 onboard estimation으로 일부 대체 가능성은 있습니다."],
  ],
  "Replay turns hardware experience into a training target": [
    ["replay를 하려면 state 정의가 완전히 같아야 하나요?", "완전히 같을 필요는 없지만 policy-relevant state를 충분히 정렬할 수 있어야 합니다."],
    ["offline RL과 비슷한가요?", "데이터 재사용 측면은 비슷하지만, 목적은 value learning보다 simulator correction target 생성에 더 가깝습니다."],
  ],
  "ASAP models the gap in action space": [
    ["왜 next-state residual보다 action residual이 practical하죠?", "기존 controller interface를 거의 건드리지 않고 삽입할 수 있기 때문입니다."],
    ["low-level PD가 바뀌면 residual도 다시 배워야 하나요?", "가능성이 큽니다. effective action mapping 자체가 달라지기 때문입니다."],
  ],
  "Why action residuals are attractive here": [
    ["이 표현이 잘 맞는 전형적 상황은 뭔가요?", "명령은 같은데 실제 actuator/contact 응답이 다르게 나타나는 경우입니다."],
    ["언제는 잘 안 맞을 수 있나요?", "전역 모델링 오류가 너무 크거나 morphology mismatch가 큰 경우입니다."],
  ],
  "The aligned simulator is the key artifact": [
    ["aligned simulator는 어떻게 평가하죠?", "replay transition error, contact timing, 그리고 그 안에서 재학습한 policy의 transfer 성능으로 평가합니다."],
    ["이 접근의 핵심 장점은 뭔가요?", "비싼 real data를 반복 가능한 simulator training asset으로 바꾼다는 점입니다."],
  ],
  "Fine-tuning is still a control problem, not just a fitting problem": [
    ["왜 RL 재학습이 꼭 필요한가요?", "one-step fit이 좋아져도 long-horizon recovery와 timing 전략은 policy가 다시 배워야 하기 때문입니다."],
    ["supervised fine-tuning으로 대체할 수 없나요?", "일부 보정은 가능하지만 closed-loop adaptation은 RL이 더 자연스럽습니다."],
  ],
  "Deployment remains operationally simple": [
    ["배포 복잡도가 왜 중요하죠?", "실제 로봇에서는 runtime module이 늘수록 지연과 디버깅 부담이 빠르게 커집니다."],
    ["policy 하나만 남기는 것이 재현성에도 도움이 되나요?", "직접 보장은 아니지만 시스템 단순화로 운영 안정성을 높여 줍니다."],
  ],
  "What the residual is likely absorbing": [
    ["이걸 해석 가능한 파라미터로 되돌릴 수 있나요?", "일부는 가능하겠지만, 논문은 해석 가능한 식별보다 control-relevant correction을 우선합니다."],
    ["특정 관절에 correction이 몰리면 어떻게 읽어야 하죠?", "그 관절 또는 contact chain이 주요 mismatch source일 가능성이 높다는 힌트입니다."],
  ],
  "Method summary": [
    ["한 단계만 빼도 성립하나요?", "stage 1 strong pretraining이나 middle alignment가 빠지면 ASAP의 핵심 주장이 크게 약해집니다."],
    ["우리 시스템에서 가장 먼저 구현할 부분은 뭔가요?", "real rollout replay와 paired transition 비교 파이프라인입니다."],
  ],
  "What convincing evidence should look like": [
    ["왜 결과를 층별로 읽어야 하죠?", "좋아진 이유를 분해하지 않으면 training budget 증가나 confound를 배제하기 어렵기 때문입니다."],
    ["다른 sim-to-real 논문에도 이 프레임을 쓸 수 있나요?", "네. local model fidelity와 final deployment value를 분리해 보는 데 유용합니다."],
  ],
  "The evaluation asks three separate questions": [
    ["ablation이 왜 중요하죠?", "alignment 자체의 효과와 더 많은 학습의 효과를 분리해야 하기 때문입니다."],
    ["cross-simulator를 real robot보다 먼저 보는 이유는 뭔가요?", "hardware confound를 줄인 통제된 환경에서 controller improvement를 먼저 확인할 수 있기 때문입니다."],
  ],
  "The first win is better transition matching": [
    ["transition matching 개선이 실제로 의미하는 바는 뭔가요?", "같은 명령에 대해 simulator가 더 비슷한 다음 상태를 만든다는 뜻입니다."],
    ["이 결과만 좋고 real은 안 좋아질 수도 있나요?", "그럴 수 있습니다. 그래서 closed-loop와 real robot 결과가 추가로 필요합니다."],
  ],
  "Then closed-loop transfer improves": [
    ["sim-to-sim 개선이 real-world 개선을 얼마나 예측하나요?", "완전히 대체하진 않지만, aligned simulator가 policy optimization에 실질적으로 도움이 된다는 강한 중간 증거입니다."],
    ["이 단계에서 특히 보고 싶은 failure mode는 뭔가요?", "landing 이후 drift 감소와 recovery timing 개선입니다."],
  ],
  "Hard motions are the right stress test": [
    ["왜 hard motion 결과가 더 믿을 만하죠?", "transfer mismatch가 클수록 쉬운 동작보다 hard motion에서 차이가 더 분명히 드러나기 때문입니다."],
    ["발표용 데모도 hard motion 위주가 좋나요?", "네. 차이가 가장 잘 드러나는 failure-sensitive motion을 우선하는 편이 좋습니다."],
  ],
  "Real-robot data is scarce enough that data efficiency matters": [
    ["data efficiency를 더 개선하려면?", "failure-focused collection, active state coverage, iterative refresh가 다음 후보입니다."],
    ["적은 데이터로 과적합 위험은 없나요?", "있습니다. 그래서 coverage와 held-out evaluation이 중요합니다."],
  ],
  "The main result is better closed-loop agility on hardware": [
    ["여기서 가장 중요한 결과 행은 무엇인가요?", "skill preservation과 recovery quality 두 줄이 핵심입니다."],
    ["이 결과를 바로 일반화해도 되나요?", "아직은 어렵고, motion set 다양성과 다른 embodiment 재현성이 추가로 필요합니다."],
  ],
  "Recovered agility is the point": [
    ["이 데모는 어떻게 설명하면 좋죠?", "동작 시작보다 접촉 후 회복과 다음 자세 연결을 짚는 방식이 가장 효과적입니다."],
    ["정성 결과를 과장하지 않으려면?", "정량 결과를 뒷받침하는 visual evidence로 제한해서 말하면 됩니다."],
  ],
  "Real-world execution is the decisive lens": [
    ["이 figure는 paper 원본이 맞나요?", "네. 지금 슬라이드에는 paper Figure 8을 직접 사용했고, Unitree G1의 실제 forward-jump deployment 장면입니다."],
    ["왜 decisive evidence라고 부르나요?", "aligned training의 이득이 실제 하드웨어 동작으로 이어졌는지 보여 주는 가장 직접적인 증거이기 때문입니다."],
  ],
  "More real data helps until the important mismatch has already been covered": [
    ["그럼 어떤 rollout을 더 모아야 하나요?", "이미 잘 되는 구간보다 실패가 반복되는 접촉·착지 국면을 더 많이 포함한 rollout이 유효합니다."],
    ["coverage를 실무적으로 어떻게 판단하죠?", "새 데이터 투입 후 residual 패턴과 성능이 더 변하는지로 판단할 수 있습니다."],
  ],
  "How the delta is used matters as much as learning it": [
    ["noise injection과 본질 차이가 뭐죠?", "noise는 넓게 흔드는 반면 ASAP은 측정된 bias를 구조적으로 simulator transition에 반영합니다."],
    ["online correction으로만 써도 되지 않나요?", "일부 효과는 있겠지만, policy가 보정된 물리 아래서 새 전략을 배우는 이점이 줄어듭니다."],
  ],
  "The residual is structured rather than uniform": [
    ["structured residual 시각화로 무엇을 얻나요?", "어느 관절·국면이 주요 mismatch source인지 파악해 후속 모델링 방향을 잡을 수 있습니다."],
    ["이 구조가 논문 신뢰도와 왜 연결되죠?", "좋은 숫자가 random perturbation이 아니라 실제 편향 학습에서 왔다는 간접 근거가 되기 때문입니다."],
  ],
  "What ASAP adds": [
    ["novelty를 기존 용어로 표현하면?", "real-data-driven simulator alignment followed by policy re-optimization입니다."],
    ["우리 연구에 가져갈 실용 포인트는 뭔가요?", "정책을 더 복잡하게 만들기 전에 학습 환경이 틀렸는지 먼저 점검하라는 점입니다."],
  ],
  "Where the method is strongest": [
    ["best case를 어떻게 알아보죠?", "simulator에서는 잘 되는데 hardware에서 특정 dynamic motion만 반복적으로 깨지는 경우입니다."],
    ["weaker case에서는 어떤 대안이 더 낫나요?", "전역 SysID, simulator 개선, embodiment-level redesign이 먼저일 수 있습니다."],
  ],
  "Limits and next comparisons": [
    ["가장 필요한 후속 실험 하나는?", "broader motion set에서 iterative rollout refresh가 계속 이득을 주는지 보는 실험입니다."],
    ["다른 로봇으로 옮길 때 가장 위험한 가정은 뭔가요?", "effective action bias가 여전히 residual 형태로 잘 표현된다는 가정입니다."],
  ],
  Resources: [
    ["논문은 어디부터 읽는 게 좋나요?", "Figure 1과 Figure 2로 구조를 잡고 stage 2와 results를 집중해서 읽는 것이 효율적입니다."],
    ["발표 후 팀 액션 아이템으로 연결하면?", "현재 시스템 실패 사례가 simulator mismatch인지 먼저 분해하고 replayable transition logging 가능성을 점검하는 것입니다."],
  ],
};

const PRESENTER_SPEAK_ADD_BY_TITLE = {
  ASAP: "이 슬라이드에서 바로 가져가실 두 문장은 명확합니다. 첫째, 문제는 Unitree G1에서 민첩한 전신 reference tracking을 실제로 살리는 것이고, 둘째, 해결 전략은 real rollout으로 simulator를 고친 뒤 그 안에서 policy를 다시 학습시키는 것입니다.",
  "Target of transfer preservation": "이 장면에서 강조하고 싶은 것은 스타일 자체가 아니라 execution quality입니다. 즉, 공중 자세가 예쁜가보다 착지와 회복까지 포함한 closed-loop execution이 유지되는가를 보셔야 합니다.",
  "Hardware physics as the remaining transfer bottleneck": "화면의 세 요소를 순서대로 읽으면, reference는 이미 풍부하고 policy도 simulation에서는 충분히 강합니다. 남는 문제는 transfer 단계에서 드러나는 hardware physics mismatch이고, ASAP은 바로 그 부분을 겨냥합니다.",
  "Core mechanism": "이 슬라이드에서는 figure를 기준으로 설명하겠습니다. 먼저 strong tracker를 pretrain하고, 그 정책으로 real trajectory를 모은 다음, delta action으로 simulator physics를 align하고, 마지막에 그 aligned simulator에서 policy를 fine-tune합니다.",
  "Why transfer alignment matters now": "이 파이프라인이 말하는 바는 단순합니다. reference motion과 whole-body control은 이미 많이 성숙했고, 실제 deployment에서 capability가 깨지는 마지막 interface가 점점 더 중요해졌다는 것입니다.",
  "Agile whole-body skills expose mismatch early": "네 개 용어를 실제 failure mode로 읽으면 됩니다. impact timing은 착지 프레임 오차, actuator gap은 대역폭과 지연, hidden compliance는 발과 링크의 실제 유연성, balance margin은 회복 여유 부족을 뜻합니다.",
  "Analytical frame for related work": "이 표는 관련 연구를 같은 잣대로 읽기 위한 기준표입니다. 행동이 어디서 왔는지, policy가 무엇을 지키려 하는지, sim-to-real gap을 어떻게 다루는지, 그리고 무엇을 성공 증거로 삼는지를 분리해서 보자는 뜻입니다.",
  "DeepMimic established the imitation-learning template": "이 슬라이드의 핵심은 DeepMimic이 reference-tracking RL template를 정착시켰다는 점입니다. 즉 reference motion을 물리 기반 정책으로 바꾸는 기본 구조를 세웠고, ASAP의 stage 1도 그 계보 위에 있습니다.",
  "AMP made motion priors a first-class control signal": "AMP는 style reward를 손으로 많이 짜는 대신 motion prior를 데이터에서 배우게 했다는 점이 중요합니다. 그래서 simulator 안 behavior quality는 크게 좋아졌지만, 그 자체가 hardware transfer를 해결해 주지는 않습니다.",
  "HumanPlus highlights real humanoid imitation and deployment": "HumanPlus는 사람 행동을 실제 humanoid behavior로 연결하는 real-world imitation 사례라고 보시면 됩니다. 이 슬라이드의 두 bullet처럼 강점은 behavior source와 deployment story 쪽이고, simulator alignment가 핵심 공헌은 아닙니다.",
  "Humanoid Parkour pushes dynamic task difficulty from another direction": "이 논문은 human reference transfer보다 고난도 dynamic execution을 얼마나 밀어붙일 수 있는지를 보여줍니다. 여기서 중요한 것은 agility pressure가 커질수록 transfer 문제가 더 빨리, 더 크게 드러난다는 점입니다.",
  "Classical transfer baselines attack the gap differently": "비교표를 보시면 system identification은 전역 파라미터를 맞추고, domain randomization은 넓게 버티게 만들고, state residual은 상태 예측을 고칩니다. ASAP은 그와 달리 effective action을 보정해 policy가 보는 training dynamics 자체를 바꿉니다.",
  "ASAP in the research landscape": "이 포지셔닝에서 ASAP은 expressive whole-body 쪽에 있으면서도 real deployment 쪽으로 더 내려와 있는 논문입니다. 즉, 새로운 motion source보다 transfer quality 자체를 학문적 기여로 내세우는 위치에 있습니다.",
  "A precise criterion for SOTA": "여기서는 SOTA를 한 숫자로 읽지 않습니다. richness는 행동 표현력, robustness는 dynamics 변화에 대한 안정성, evidence는 그 이득이 실제 hardware closed loop까지 이어졌는지를 뜻합니다.",
  "Contribution boundary of the paper": "이 슬라이드는 논문의 claim boundary를 정리하는 장면입니다. 이미 강한 reference generation과 simulator tracking 위에서, ASAP이 해야 하는 일은 imitation stack 전체 교체가 아니라 마지막 transfer failure를 줄이는 것입니다.",
  "Human motion as the reference source": "이 파이프라인을 실제 발화로 풀면, human video에서 출발해 body reconstruction을 하고, trainable하도록 cleaning한 뒤, 최종적으로 Unitree G1 joint space로 retargeting해 reference를 만든다는 뜻입니다.",
  "Reference preparation and physical feasibility": "지금 보시는 Figure 2는 human video에서 시작한 motion이 SMPL reconstruction과 RL clean-up을 거쳐 G1 motion으로 retarget되고, 마지막에 real robot execution으로 이어지는 전체 과정을 보여줍니다. 이 슬라이드의 핵심은 reference가 robot-feasible해야 뒤의 transfer 분석도 의미가 생긴다는 점입니다.",
  "The tracking policy is phase-aware and feedback-driven": "네 개 항목을 그대로 풀면, observation에는 robot state와 timing context가 들어가고, phase는 비슷한 pose라도 다른 미래 의도를 구별하는 신호이며, action은 여전히 robot control이고, critic privilege는 training에서만 richer state를 쓰는 구조입니다.",
  "The reward balances fidelity and stability": "이 reward 구성은 pose만 맞추는 것이 아니라 root motion과 velocity, contact pattern, regularization을 함께 본다는 뜻입니다. 즉 보기 좋은 imitation과 실제로 제어 가능한 imitation을 동시에 맞추는 설계라고 이해하시면 됩니다.",
  "A strong stage-1 simulator baseline": "여기서 강조할 점은 stage 1만으로도 simulator 안에서는 이미 꽤 competent한 policy가 나온다는 사실입니다. 그래서 stage 2는 skill을 새로 배우는 단계가 아니라 transfer를 보수하는 단계입니다.",
  "Simulator competence is limited to simulator physics": "비교표 그대로 읽으면, stage 1이 배우는 것은 simulator 규칙 아래의 reference-following control이고, 놓치는 것은 actuator와 contact, linkage에서 오는 robot-specific transition bias입니다. 그래서 real rollout이 필요합니다.",
  "Real rollouts as alignment supervision": "이 카드 세 장은 실제 데이터가 어떤 역할을 하는지 잘 보여줍니다. real rollout은 state-action-next-state evidence를 주고, 예산은 safety-limited라서 아껴 써야 하며, replay가 가능해야 simulator 쪽 paired comparison으로 재사용할 수 있습니다.",
  "Replay as paired transition supervision": "여기 수식 블록은 아주 실용적인 이야기입니다. real record로는 실제 다음 상태를 알고, 같은 state-action을 simulator에 넣어 simulated next state를 만들고, 둘의 gap을 delta model 학습 신호로 쓴다는 뜻입니다.",
  "Action-space modeling of the physics gap": "이 슬라이드의 식은 nominal action에 state-dependent delta를 더해 corrected action을 만들고, 그 corrected action을 넣었을 때 simulator next state가 real next state에 가까워지도록 하겠다는 의미입니다.",
  "Why action residuals are attractive here": "이 비교의 핵심은 action residual이 local하고 state-dependent한 effective control bias를 담기에 적합하다는 점입니다. 반면 전역 parameter tuning은 너무 거칠고, state correction은 control-side 해석이 약해질 수 있습니다.",
  "The aligned simulator as the core artifact": "이제 핵심 산출물을 simulator로 읽어야 합니다. residual을 freeze한 뒤 simulator 안에 넣어 두면, 이후 policy는 더 실제와 가까운 transition 아래에서 계속 RL fine-tuning을 수행할 수 있습니다.",
  "Fine-tuning under aligned physics": "세 단계 sequence를 그대로 읽으면, 먼저 local transition이 덜 틀리게 바뀌고, 그 결과 training state distribution이 달라지며, 마지막에 RL이 그 수정된 dynamics 아래에서 recovery와 timing을 다시 학습합니다.",
  "Deployment remains a single-policy system": "이 슬라이드가 말하는 실용적 장점은 분명합니다. training 중에는 delta model이 필요하지만, deployment 시점에는 그 복잡성이 policy 안으로 흡수되고 실제 로봇은 single policy만 실행합니다.",
  "What the residual is likely absorbing": "세 카드의 의미를 합치면, residual은 특정 joint concentration, 특히 contact chain sensitivity가 큰 부위에서 구조적 correction을 배우고 있고, 그래서 arbitrary jitter보다 hardware bias로 읽을 근거가 생깁니다.",
  "Two-stage method summary": "이 슬라이드는 발표 중간에 파이프라인을 다시 고정하는 역할을 합니다. pretrain, collect real rollout, align simulator, fine-tune policy라는 네 동사만 기억하셔도 논문 구조는 충분합니다.",
  "Evidence required by the claim": "이제부터 결과는 한 방향으로 읽으시면 됩니다. local dynamics matching이 좋아졌는지, 그 simulator에서 다시 학습한 policy가 실제로 더 나아졌는지, 그리고 마지막에 real robot까지 이득이 이어졌는지를 순서대로 확인합니다.",
  "Three evaluation questions": "이 표는 replay, cross-simulator, real robot, ablation이 각각 어떤 질문에 답하는지를 정리합니다. 따라서 결과를 보실 때도 지금 이 그림의 어느 행을 검증하는지 계속 염두에 두시면 됩니다.",
  "Improved transition matching": "세 지표를 실제로 해석하면, replay error가 줄고 contact timing이 hardware trace에 가까워지고, residual이 generic noise가 아니라 repeatable bias pattern을 포착했다는 뜻입니다.",
  "Improved closed-loop transfer": "이 장면에서 보고 싶은 메시지는 simple fitting을 넘어서 controller 자체가 좋아졌다는 점입니다. aligned simulator에서 다시 학습한 policy가 changed dynamics에서도 더 잘 버틴다면 그 자체가 strong evidence가 됩니다.",
  "Hard motions as the proper stress test": "세 bullet을 그대로 풀면, 쉬운 동작은 transfer weakness를 숨길 수 있고, dynamic balance와 explosive motion은 contact와 timing 오류를 바로 드러내며, 그래서 ASAP은 hard motion에서 봐야 진짜 차이가 드러난다는 뜻입니다.",
  "Why data efficiency matters": "이 슬라이드는 real rollout이 scarce하다는 현실을 다룹니다. 너무 적으면 bias를 좁게 보고, 어느 정도 coverage에서는 meaningful gain이 나오며, critical failure mode를 덮고 나면 추가 데이터의 수익은 줄어듭니다.",
  "Improved closed-loop agility on hardware": "이 표를 그대로 읽으면, ASAP 이후에는 hard motion preservation이 좋아지고, mismatch가 drift나 collapse로 번지는 정도가 줄며, deployment complexity는 여전히 single policy로 유지됩니다.",
  "Recovered agility in real execution": "이 비디오는 style보다 recovery를 보셔야 합니다. transfer method가 가치 있으려면 contact 이후에도 motion이 살아 있고, landing 뒤 posture와 timing이 이어져야 한다는 점을 강조하는 장면입니다.",
  "Real-world execution as final evidence": "지금 Figure 8은 실제 Unitree G1 forward jump deployment 장면입니다. 이 슬라이드에서의 메시지는 아주 명확하게, simulator alignment의 가치는 real-world closed-loop execution으로만 최종 판정된다는 것입니다.",
  "Additional real data helps until coverage saturates": "세 카드의 흐름대로, 처음에는 residual이 좁은 bias만 보고, 중간 coverage에서 가장 큰 gain이 생기며, 주요 failure mode를 이미 덮고 나면 비슷한 추가 rollout은 덜 중요해집니다.",
  "How delta usage affects the gain": "이 비교표는 delta를 배우는 것만으로는 충분하지 않다는 점을 보여줍니다. no delta는 simulator bias를 그대로 두고, loose robustness는 measured bias를 재현하지 못하며, aligned simulator 안 fine-tuning이 실제 gain을 만듭니다.",
  "The residual reflects structured bias": "세 카드가 합쳐서 말하는 바는 correction이 모든 관절에 균일하게 뿌려진 것이 아니라 joint concentration과 contact chain sensitivity를 따라 구조적으로 나타난다는 것입니다.",
  "ASAP's main contribution": "before, during, after 세 칸을 그대로 읽으면 됩니다. 기존 strong policy가 hardware-specific bias 때문에 깨졌고, real rollout이 더 realistic한 transition을 가르쳤으며, 그 결과 final policy는 더 많은 agility를 유지한 채 단순하게 배포됩니다.",
  "Where the method is most effective": "best case 두 줄과 weaker case 두 줄을 같이 읽으시면 좋습니다. simulator policy는 competent하지만 hardware dynamics에 brittle하고, task가 impact-sensitive할수록 잘 맞으며, 반대로 simulator가 전반적으로 너무 틀리거나 real rollout coverage가 너무 좁으면 한계가 있습니다.",
  "Limits and next comparisons": "이 슬라이드는 coverage limit, representation limit, 그리고 next-step comparison을 나눠서 말합니다. 즉 보지 못한 failure mode는 고칠 수 없고, action residual은 어디까지나 bias model이며, 다음으로는 broader motion set과 iterative refresh가 필요합니다.",
  Resources: "마지막으로 paper, project, code 링크를 남겨 두었습니다. 하지만 발표에서 남겨야 할 핵심 문장은, simulator가 틀린 physics를 가르치고 있다면 policy보다 먼저 simulator를 고쳐야 한다는 것입니다.",
};

function presenterStripHtml(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizePresenterScriptBlocks(script) {
  if (Array.isArray(script) && script.every((item) => typeof item === "string")) {
    if (script.length === 1) {
      return [{ speak: script[0], detail: "" }];
    }

    const [speak, detail, ...rest] = script;
    return [
      {
        speak,
        detail: [detail, ...rest].filter(Boolean).join(" "),
      },
    ];
  }

  if (Array.isArray(script)) {
    return script.map((item) =>
      typeof item === "string" ? { speak: item, detail: "" } : { speak: item.speak || "", detail: item.detail || "" },
    );
  }

  if (typeof script === "string") {
    return [{ speak: script, detail: "" }];
  }

  return [];
}

function describePointListKo(slide) {
  if (!Array.isArray(slide.points) || !slide.points.length) {
    return "";
  }

  const items = slide.points.map((point, index) => `${index + 1}번째 bullet은 ${presenterStripHtml(point)}`);
  return `슬라이드의 bullet은 순서대로 ${items.join(", ")}입니다.`;
}

function describeTupleItemsKo(items, intro, formatter) {
  if (!Array.isArray(items) || !items.length) {
    return "";
  }

  const body = items
    .map((item, index) => formatter(item, index))
    .filter(Boolean)
    .join(" ");

  return body ? `${intro} ${body}` : "";
}

function describeVisualKo(slide) {
  const visual = slide.visual;
  if (!visual) {
    return "";
  }

  if (visual.type === "image" || visual.type === "video") {
    return visual.caption ? `대표 시각 자료는 ${presenterStripHtml(visual.caption)}` : "";
  }

  if (visual.type === "cards" || visual.type === "terms") {
    return describeTupleItemsKo(
      visual.items,
      visual.type === "terms" ? "화면의 용어 박스는" : "화면의 카드들은",
      ([label, text], index) => `${index + 1}번째 ${presenterStripHtml(label)}는 ${presenterStripHtml(text)}를 뜻합니다.`,
    );
  }

  if (visual.type === "formula") {
    return describeTupleItemsKo(
      visual.items,
      "수식 블록은",
      ([label, text], index) => `${index + 1}번째 ${presenterStripHtml(label)} 항이 ${presenterStripHtml(text)}를 나타냅니다.`,
    );
  }

  if (visual.type === "pipeline") {
    return describeTupleItemsKo(
      visual.steps,
      "파이프라인은",
      ([label, text], index) => `${index + 1}단계 ${presenterStripHtml(label)}에서 ${presenterStripHtml(text)}`,
    );
  }

  if (visual.type === "compare") {
    return describeTupleItemsKo(
      visual.rows,
      "비교표는",
      ([name, focus, text]) =>
        `${presenterStripHtml(name)}가 ${presenterStripHtml(focus)}에 초점을 두고, 핵심 차이는 ${presenterStripHtml(text)}라는 점을 보여줍니다.`,
    );
  }

  if (visual.type === "table") {
    return describeTupleItemsKo(
      visual.rows,
      "표의 각 행은",
      (row) => row.map((cell) => presenterStripHtml(cell)).join(" / "),
    );
  }

  if (visual.type === "axis") {
    const axes = `가로축은 ${presenterStripHtml(visual.xLeft)}에서 ${presenterStripHtml(visual.xRight)}까지, 세로축은 ${presenterStripHtml(visual.yBottom)}에서 ${presenterStripHtml(visual.yTop)}까지를 뜻합니다.`;
    const points = describeTupleItemsKo(
      visual.points,
      "배치된 논문 점들은",
      ([label]) => `${presenterStripHtml(label)}의 상대적 위치를 표시합니다.`,
    );
    return [axes, points].filter(Boolean).join(" ");
  }

  if (visual.type === "sequence") {
    return describeTupleItemsKo(
      visual.items,
      "순차 블록은",
      ([label, text], index) => `${index + 1}단계 ${presenterStripHtml(label)}에서 ${presenterStripHtml(text)}`,
    );
  }

  if (visual.type === "metrics") {
    return describeTupleItemsKo(
      visual.items,
      "지표 카드는",
      ([label, value, text]) =>
        `${presenterStripHtml(label)}가 ${presenterStripHtml(value)} 방향으로 바뀌고, 이는 ${presenterStripHtml(text)}를 의미합니다.`,
    );
  }

  if (visual.type === "quote") {
    return visual.text ? `마지막 인용문은 ${presenterStripHtml(visual.text)}` : "";
  }

  return "";
}

function enhancePresenterNotes(slide, notes) {
  const resolvedTitle = PRESENTER_TITLE_ALIASES[slide.title] || slide.title;
  const scriptBlocks = normalizePresenterScriptBlocks(notes.scriptKo);
  const supplementalSpeak =
    PRESENTER_SPEAK_ADD_BY_TITLE[slide.title] || PRESENTER_SPEAK_ADD_BY_TITLE[resolvedTitle] || "";
  const extraDetails = [
    PRESENTER_DETAIL_BY_TITLE[slide.title] || PRESENTER_DETAIL_BY_TITLE[resolvedTitle] || "",
    describePointListKo(slide),
    describeVisualKo(slide),
  ]
    .filter(Boolean)
    .join(" ");

  if (!scriptBlocks.length) {
    return {
      ...notes,
      scriptKo: extraDetails || supplementalSpeak ? [{ speak: supplementalSpeak, detail: extraDetails }] : [],
      qaKo: [...(Array.isArray(notes.qaKo) ? notes.qaKo : []), ...(PRESENTER_EXTRA_QA_BY_TITLE[slide.title] || PRESENTER_EXTRA_QA_BY_TITLE[resolvedTitle] || [])],
    };
  }

  const enrichedBlocks = scriptBlocks.map((block) => ({
    speak: block.speak,
    detail: block.detail,
  }));

  if (supplementalSpeak) {
    enrichedBlocks.push({
      speak: supplementalSpeak,
      detail: extraDetails,
    });
  } else {
    const lastBlock = enrichedBlocks[enrichedBlocks.length - 1];
    lastBlock.detail = [lastBlock.detail, extraDetails].filter(Boolean).join(" ");
  }

  return {
    ...notes,
    scriptKo: enrichedBlocks,
    qaKo: [...(Array.isArray(notes.qaKo) ? notes.qaKo : []), ...(PRESENTER_EXTRA_QA_BY_TITLE[slide.title] || PRESENTER_EXTRA_QA_BY_TITLE[resolvedTitle] || [])],
  };
}

window.ASAP_DECK.slides = window.ASAP_DECK.slides.map((slide) => {
  const resolvedTitle = PRESENTER_TITLE_ALIASES[slide.title] || slide.title;
  const notes = PRESENTER_NOTES_BY_TITLE[slide.title] || PRESENTER_NOTES_BY_TITLE[resolvedTitle] || {};
  return {
    ...slide,
    ...enhancePresenterNotes(slide, notes),
  };
});
