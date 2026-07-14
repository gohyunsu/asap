const PAPER_URL = "https://arxiv.org/abs/2502.01143";
const PROJECT_URL = "https://agile.human2humanoid.com/";
const CODE_URL = "https://github.com/LeCAR-Lab/ASAP";
const DEEPMIMIC_URL = "https://xbpeng.github.io/projects/DeepMimic/index.html";
const AMP_URL = "https://xbpeng.github.io/projects/AMP/index.html";
const PARKOUR_URL = "https://humanoid4parkour.github.io/";
const HUMANPLUS_URL = "https://humanoid-ai.github.io/";
const ASAP_HERO_VIDEO_URL =
  "https://agile.human2humanoid.com/static/videos/Hero-ASAP-Video-Website-Hero-16-9-202502031028-1080P.mp4";

function qa(question, answer) {
  return [question, answer];
}

function note(speak, detail = "", qaKo = []) {
  return {
    scriptKo: [{ speak, detail }],
    qaKo,
  };
}

function paperImage(src, caption, alt = caption, extra = {}) {
  return {
    type: "image",
    src,
    alt,
    caption,
    source: PAPER_URL,
    sourceLabel: "paper",
    ...extra,
  };
}

function projectImage(src, caption, alt = caption, extra = {}) {
  return {
    type: "image",
    src,
    alt,
    caption,
    source: PROJECT_URL,
    sourceLabel: "project",
    ...extra,
  };
}

function projectVideo(src, caption, extra = {}) {
  return {
    type: "video",
    src,
    caption,
    source: PROJECT_URL,
    sourceLabel: "project",
    ...extra,
  };
}

window.ASAP_DECK = {
  title: "ASAP: Aligning Simulation and Real-World Physics",
  subtitle: "Final-presentation deck focused on paper-grounded method, evidence, and practical transfer details",
  sections: [
    {
      key: "setup",
      label: "1 Setting",
      chapters: ["Task", "Method"],
    },
    {
      key: "landscape",
      label: "2 Landscape",
      chapters: ["Field", "Related Work", "Baselines"],
    },
    {
      key: "pretrain",
      label: "3 Stage 1",
      chapters: ["Reference", "Policy", "Gap"],
    },
    {
      key: "alignment",
      label: "4 Stage 2",
      chapters: ["Data", "Alignment", "Fine-Tuning"],
    },
    {
      key: "evidence",
      label: "5 Evidence",
      chapters: ["Protocol", "Simulation", "Real World", "Analysis"],
    },
    {
      key: "takeaways",
      label: "6 Takeaways",
      chapters: ["Interpretation", "Resources"],
    },
  ],
  slides: [
    {
      section: "setup",
      chapter: "Task",
      title: "ASAP",
      subtitle: "Aligning simulation and real-world physics for learning agile humanoid whole-body skills",
      byline: "Hyunsu Go · Visual Computing Lab",
      lead: "ASAP targets a narrow but important failure mode: a motion-tracking policy already looks competent in simulation, but loses agility after deployment because the effective hardware physics is different.",
      points: [
        `<strong>Setting.</strong> The robot is Unitree G1, and the task is agile whole-body reference tracking rather than generic locomotion.`,
        `<strong>Intervention.</strong> Real rollouts are used to train a delta action model, and the final policy is fine-tuned inside the aligned simulator with PPO.`,
      ],
      visual: paperImage(
        "assets/asap_figure1_overview.png",
        "Figure 1 from the paper: diverse agile whole-body skills on Unitree G1.",
      ),
      ...note(
        "이 발표는 ASAP 논문을 다룹니다. 핵심 문제는 시뮬레이터에서는 이미 꽤 잘 되는 whole-body motion-tracking policy가 실제 로봇에 올리면 민첩성과 안정성을 잃는다는 점입니다. 그래서 이 논문은 새 모션을 만드는 대신, 실제 rollout을 이용해 simulator physics를 더 실제에 가깝게 맞춘 뒤 그 안에서 policy를 다시 학습시키는 데 초점을 둡니다.",
        "whole-body skill은 단순 보행이 아니라 점프, 한 발 지지, 킥처럼 상체와 하체가 함께 개입하는 동작을 뜻합니다. 이런 동작은 접지, 착지, 회복이 모두 얽혀 있어서 물리 오차가 빨리 드러납니다.\n\nsim-to-real은 시뮬레이터에서 학습한 정책을 실제 하드웨어로 옮기는 과정입니다. 이 논문은 그 과정에서 남는 마지막 병목을 dynamics mismatch, 즉 시뮬레이터와 실제 하드웨어의 물리 차이로 봅니다.",
        [
          qa("이 논문의 한 줄 요약은 무엇인가요?", "실제 롤아웃으로 배운 delta action model을 시뮬레이터에 넣고, 그 정렬된 시뮬레이터 안에서 정책을 다시 fine-tune하는 방법입니다."),
          qa("왜 locomotion 논문이 아니라 whole-body skill 논문으로 읽어야 하나요?", "이 논문은 단순 주행보다 훨씬 동적인 reference tracking을 다루기 때문에, 접촉과 타이밍 오차가 transfer 병목으로 더 강하게 드러납니다."),
        ],
      ),
    },
    {
      section: "setup",
      chapter: "Task",
      variant: "hero",
      title: "Agile Whole-Body Skills on Unitree G1",
      subtitle: "The paper targets closed-loop preservation of dynamic motion rather than visually plausible playback in simulation.",
      visual: projectVideo(ASAP_HERO_VIDEO_URL, "Official ASAP project video.", { cover: true }),
      ...note(
        "여기서 봐야 하는 것은 동작의 화려함보다 닫힌 루프에서의 유지 능력입니다. 점프나 회전 이후에도 자세가 이어지고, 착지 후에 바로 무너지지 않으며, 다음 상태로 자연스럽게 넘어가는지가 핵심입니다. ASAP이 지키고 싶은 것은 바로 이런 closed-loop execution입니다.",
        "closed-loop control은 현재 상태를 계속 읽으면서 그때그때 action을 갱신하는 제어를 말합니다. 따라서 단순히 한 프레임이 예뻐 보이는 것보다, 접촉 이후에도 제어가 이어지는지가 훨씬 중요합니다.",
        [qa("이 영상에서 무엇을 가장 중점적으로 봐야 하나요?", "점프나 착지 직후의 회복 구간입니다. transfer가 약하면 바로 그 구간에서 timing과 lower-body coordination이 무너집니다.")],
      ),
    },
    {
      section: "setup",
      chapter: "Method",
      title: "Contributions and Evaluation Scope",
      subtitle: "ASAP is presented as a transfer method on top of an already competent motion-tracking stack.",
      visual: {
        type: "cards",
        cols: 3,
        items: [
          ["Stage 1", "Retarget human videos and pretrain a motion-tracking policy in simulation."],
          ["Stage 2", "Collect real trajectories, train a delta action model, and align the simulator."],
          ["Evidence", "Evaluate on IsaacGym→IsaacSim, IsaacGym→Genesis, and IsaacGym→Real."],
        ],
      },
      points: [
        `The paper's first contribution is the <strong>two-stage ASAP framework</strong> for aligning simulator physics with real rollout data.`,
        `Its second contribution is <strong>real-world deployment of RL-based whole-body skills</strong> on Unitree G1 with a single final policy.`,
        `Its third contribution is a <strong>three-scenario evaluation</strong>: IsaacGym→IsaacSim, IsaacGym→Genesis, and IsaacGym→Real.`,
      ],
      ...note(
        "논문의 기여를 이 범위로 한정해서 읽는 것이 중요합니다. 저자들은 reference generation 자체를 새로 제안하는 것이 아니라, 이미 있는 stage 1 motion-tracking stack 위에 simulator alignment 단계를 추가합니다. 그리고 그 결과를 IsaacGym에서 IsaacSim으로, IsaacGym에서 Genesis로, 그리고 실제 G1 로봇으로 옮기는 세 가지 전이 시나리오에서 모두 검증했다는 점을 contribution으로 내세웁니다.",
        "이 논문을 읽을 때 중요한 것은 claim boundary입니다. 즉 이것은 새로운 humanoid architecture나 새로운 motion source 논문이 아니라, transfer mechanism 논문이라는 점을 먼저 고정해야 합니다. 발표에서는 이 경계를 분명히 해야 뒤의 결과 표를 과대해석하지 않게 됩니다.",
        [
          qa("이 논문은 새로운 policy architecture를 제안하나요?", "핵심은 architecture보다 transfer pipeline입니다. policy는 PPO 기반 motion-tracking policy이고, 새로 추가되는 것은 delta action model과 aligned simulator입니다."),
          qa("왜 multi-environment evaluation이 중요한가요?", "단순히 한 simulator나 한 hardware setup만 보면 우연한 튜닝 효과와 method 효과를 분리하기 어렵기 때문입니다."),
        ],
      ),
    },
    {
      section: "setup",
      chapter: "Method",
      title: "Sources of Dynamics Mismatch",
      subtitle: "Dynamic reference tracking amplifies contact, actuation, and compliance errors over very short horizons.",
      visual: {
        type: "terms",
        cols: 2,
        items: [
          ["Impact timing", "A small landing-time error changes the next support state immediately."],
          ["Actuator bandwidth", "Motor lag and saturation are exposed more clearly under fast whole-body motions."],
          ["Contact modeling", "Feet and landing events are often cleaner in simulation than on hardware."],
          ["Hidden compliance", "Ankles, linkages, and structural asymmetries create bias not captured by rigid models."],
        ],
      },
      points: [
        `Easy motions can hide the transfer gap because the controller has time to recover.`,
        `Agile motions expose the gap early because <strong>one wrong contact or delayed recovery immediately propagates</strong>.`,
      ],
      ...note(
        "agile whole-body skill을 전면에 세우는 이유는 여기서 분명해집니다. 이런 동작은 공중 구간, 착지, 한 발 지지처럼 오차가 바로 다음 상태로 증폭되는 구간을 포함합니다. 그래서 시뮬레이터의 contact, actuation, compliance 모델이 조금만 틀려도 closed-loop behavior가 빠르게 어긋납니다.",
        "dynamics mismatch는 단순히 mass parameter 하나가 틀린다는 뜻이 아니라, actuator delay, contact impulse, structural asymmetry처럼 controller가 체감하는 유효 물리가 다르다는 뜻입니다. 이 논문은 그 차이를 action interface에서 모델링하려고 합니다.",
        [qa("왜 어려운 동작일수록 transfer 문제가 더 잘 보이나요?", "동적 동작은 회복 여유가 적어서 simulator bias가 누적되기 전에 바로 실패로 드러나기 때문입니다.")],
      ),
    },
    {
      section: "landscape",
      chapter: "Field",
      title: "Related Work Positioning",
      subtitle: "The key distinctions are motion source, control objective, transfer mechanism, and real-world evidence.",
      layout: "wide",
      visual: {
        type: "table",
        headers: ["Method", "Reference source", "Primary objective", "Transfer mechanism", "Real-world evidence"],
        rows: [
          ["DeepMimic", "MoCap", "Physics-based motion imitation", "None", "No"],
          ["AMP", "Motion dataset", "Stylized control via motion prior", "None", "No"],
          ["HumanPlus", "Human behavior", "Real-humanoid imitation", "Deployment interface", "Yes"],
          ["Humanoid Parkour", "Task/perception", "Dynamic task control", "Robust policy training", "Yes"],
          ["ASAP", "Retargeted human video", "Agile whole-body tracking", "Real-data simulator alignment", "Yes"],
        ],
      },
      points: [
        `DeepMimic and AMP explain where stage-1 tracking quality comes from, but not how to repair the final hardware transfer boundary.`,
        `HumanPlus and Humanoid Parkour are stronger references for <strong>deployment regime and task difficulty</strong> than for simulator-alignment design.`,
      ],
      ...note(
        "related work는 이 네 축으로 읽는 것이 가장 효율적입니다. 첫째, reference가 어디서 오는지. 둘째, policy가 무엇을 보존하려는지. 셋째, sim-to-real을 어떤 방식으로 다루는지. 넷째, 실제 하드웨어에서 어떤 수준의 evidence를 제시하는지입니다. 이 기준으로 보면 ASAP의 차별점은 motion source가 아니라 real-data simulator alignment에 있습니다.",
        "motion source는 사람이 보여준 움직임, mocap, 혹은 task reward처럼 policy가 따라가야 할 목표가 어디서 오느냐를 뜻합니다. transfer mechanism은 그 목표를 실제 하드웨어까지 가져갈 때 simulator mismatch를 무엇으로 처리하느냐를 뜻합니다.",
        [qa("ASAP를 기존 imitation literature 안에서 가장 정확히 어디에 놓아야 하나요?", "reference-tracking humanoid control 위에 올라가는 transfer method로 보는 것이 가장 정확합니다.")],
      ),
    },
    {
      section: "landscape",
      chapter: "Related Work",
      title: "DeepMimic",
      subtitle: "DeepMimic is the template for turning reference motion into robust physics-based behavior.",
      visual: {
        type: "image",
        src: "assets/deepmimic_teaser.png",
        alt: "DeepMimic teaser image",
        caption: "DeepMimic project page.",
        source: DEEPMIMIC_URL,
        sourceLabel: "project",
      },
      points: [
        `DeepMimic established the <strong>reference-tracking RL template</strong> that ASAP inherits in stage 1.`,
        `Its scope is simulator-side physics imitation, not real-hardware simulator alignment.`,
        `In the ASAP reading, DeepMimic explains <strong>why stage-1 tracking is plausible</strong>, but not why it later fails on hardware.`,
      ],
      ...note(
        "DeepMimic는 ASAP의 stage 1이 어떤 전통 위에 서 있는지를 가장 잘 보여줍니다. reference motion을 두고 RL policy가 그것을 physics simulation 안에서 안정적으로 따라가게 만든다는 기본 틀은 DeepMimic 계열에서 정립되었습니다. 다만 DeepMimic 자체는 real-hardware transfer를 직접 푸는 논문은 아닙니다.",
        "reference-tracking reinforcement learning은 정답 action을 supervised하게 주는 대신, reference와의 tracking reward를 최대화하도록 policy를 학습하는 방식입니다. 그래서 contact와 balance를 policy가 스스로 배우게 된다는 장점이 있습니다.",
        [qa("ASAP의 novelty가 DeepMimic과 가장 다르게 갈리는 지점은 어디인가요?", "reference-following stage 1이 아니라, 그 이후 simulator와 hardware 사이의 transfer gap을 real rollout으로 줄이는 stage 2입니다.")],
      ),
    },
    {
      section: "landscape",
      chapter: "Related Work",
      title: "Adversarial Motion Priors (AMP)",
      subtitle: "AMP shifts part of behavior specification from manual reward engineering to data-driven motion priors.",
      visual: {
        type: "image",
        src: "assets/amp_teaser.png",
        alt: "AMP teaser image",
        caption: "AMP project page.",
        source: AMP_URL,
        sourceLabel: "project",
      },
      points: [
        `AMP is important because it makes <strong>learned motion priors</strong> a control signal.`,
        `It is adjacent to ASAP in spirit, but it still does not address the real-data simulator-alignment step directly.`,
      ],
      ...note(
        "AMP는 style이나 motion realism을 reward 항목 하나하나로 다 쓰기보다, motion dataset으로부터 prior를 학습해 policy가 그 prior를 따르도록 만든다는 점이 핵심입니다. 그래서 behavior specification을 더 data-driven하게 가져간다는 의미가 있습니다. 하지만 ASAP과의 직접적인 접점은 simulator alignment가 아니라, stage 1에서 어떤 kind의 motion structure를 줄 것이냐에 가깝습니다.",
        "motion prior는 어떤 동작이 자연스럽고 어떤 동작이 부자연스러운지를 데이터에서 배운 제약입니다. ASAP은 그런 prior를 새로 설계하는 대신, 이미 구성된 motion-tracking stack의 transfer failure를 줄이는 데 집중합니다.",
        [qa("AMP와 ASAP을 경쟁 방법으로 봐야 하나요?", "직접 경쟁이라기보다 문제 층위가 다릅니다. AMP는 behavior prior 쪽이고, ASAP은 transfer alignment 쪽입니다.")],
      ),
    },
    {
      section: "landscape",
      chapter: "Related Work",
      title: "HumanPlus",
      subtitle: "HumanPlus is a stronger reference for real-humanoid behavior transfer than for simulator alignment itself.",
      visual: {
        type: "image",
        src: "assets/humanplus_preview.gif",
        alt: "HumanPlus preview",
        caption: "HumanPlus project page.",
        source: HUMANPLUS_URL,
        sourceLabel: "project",
      },
      points: [
        `HumanPlus is relevant because it demonstrates <strong>rich human behavior reaching a real humanoid</strong>.`,
        `Compared with ASAP, its emphasis is more on behavior source, teleoperation or shadowing style interface, and deployment story than on residual simulator correction.`,
        `It is therefore a stronger reference for <strong>human-to-humanoid behavior transfer</strong> than for simulator-physics alignment.`,
      ],
      ...note(
        "HumanPlus는 사람이 만든 동작이 실제 humanoid까지 이어질 수 있다는 점을 강하게 보여주는 계열입니다. 그래서 behavior source와 real deployment라는 관점에서는 ASAP와 같은 무대에 놓을 수 있습니다. 하지만 핵심 기술적 질문은 다릅니다. HumanPlus는 사람 행동을 로봇 동작으로 연결하는 인터페이스와 imitation story가 중심이고, ASAP은 이미 있는 tracking policy의 transfer failure를 무엇으로 줄일 것이냐가 중심입니다.",
        "여기서 behavior source는 policy가 어떤 종류의 reference를 받는지를 뜻합니다. ASAP의 novelty는 그 source보다, 실제 롤아웃을 이용해 simulator를 얼마나 더 실제처럼 만들 수 있는지에 있습니다.",
        [qa("HumanPlus와 ASAP의 가장 직접적인 차이는 무엇인가요?", "HumanPlus는 인간 행동을 실제 humanoid behavior로 연결하는 경로가 중심이고, ASAP은 simulator-hardware mismatch를 보정하는 transfer mechanism이 중심입니다.")],
      ),
    },
    {
      section: "landscape",
      chapter: "Related Work",
      title: "Humanoid Parkour",
      subtitle: "Humanoid Parkour is useful here as a marker of how demanding dynamic humanoid control has become.",
      visual: {
        type: "image",
        src: "assets/humanoid_parkour_teaser.png",
        alt: "Humanoid Parkour teaser",
        caption: "Humanoid Parkour project page.",
        source: PARKOUR_URL,
        sourceLabel: "project",
      },
      points: [
        `It is not a human-motion transfer paper, but it is an important reference for <strong>difficulty regime</strong>.`,
        `ASAP becomes more valuable exactly in the motion regime where contact timing and recovery are this unforgiving.`,
      ],
      ...note(
        "Humanoid Parkour를 넣는 이유는 ASAP과 동일 문제를 풀기 때문이 아니라, modern humanoid control이 어느 정도 난이도까지 올라갔는지를 보여주기 위해서입니다. 즉 지금 연구 커뮤니티는 이미 매우 공격적인 동적 동작을 다루고 있고, 그렇기 때문에 simulator mismatch가 더 이상 작은 문제로 남지 않습니다.",
        "difficulty regime이라는 말은 어떤 수준의 동작 난이도에서 방법의 장단점이 드러나는지를 뜻합니다. ASAP은 쉬운 보행보다 이런 고동적 동작에서 더 의미가 커집니다.",
        [qa("왜 parkour 논문을 transfer 발표에 포함하나요?", "이 논문이 겨냥하는 agility pressure가 어느 정도인지 보여주는 기준점이기 때문입니다.")],
      ),
    },
    {
      section: "landscape",
      chapter: "Baselines",
      title: "Baseline Transfer Formulations",
      subtitle: "The main comparison is with alternative ways to compensate simulator mismatch, not with alternative motion sources.",
      visual: paperImage(
        "assets/asap_figure3_baselines.png",
        "Figure 4 from the paper: Vanilla, SysID, DeltaDynamics, and Delta Action formulations.",
      ),
      points: [
        `<strong>Vanilla.</strong> No simulator correction; train in IsaacGym and test in IsaacSim, Genesis, or the real robot.`,
        `<strong>SysID.</strong> Search base CoM shift <strong>(c_x, c_y, c_z)</strong>, base-mass ratio <strong>k_m</strong>, and 23-DoF PD gain ratios <strong>(k_p^i, k_d^i)</strong> that replay real trajectories best.`,
        `<strong>DeltaDynamics versus ASAP.</strong> One corrects next-state prediction; the other corrects the action interface the policy already uses for PPO fine-tuning.`,
        `<strong>Operational distinction.</strong> DeltaDynamics improves forward prediction, whereas ASAP is designed to improve the controller's training dynamics before deployment.`,
      ],
      ...note(
        "논문 안의 baseline을 정확히 이해하는 것이 중요합니다. Vanilla는 아무 보정 없이 policy를 그대로 옮기는 기준선입니다. SysID는 CoM shift와 base mass ratio, 그리고 23개 관절의 PD gain ratio를 real rollout replay 기준으로 탐색합니다. DeltaDynamics는 residual dynamics model로 다음 상태를 보정하려 하고, ASAP은 residual action policy로 effective command 자체를 보정합니다.",
        "SysID는 simulator parameter를 맞추는 전통적인 접근입니다. DeltaDynamics는 state transition model 쪽 보정이고, delta action은 control interface 쪽 보정입니다. ASAP의 주장은 후자가 policy adaptation과 더 잘 결합된다는 것입니다.",
        [
          qa("왜 action-space correction이 더 실용적이라고 보나요?", "최종 policy가 원래도 action을 통해 simulator와 상호작용하기 때문에, bias를 같은 interface에서 보정하는 편이 controller adaptation과 연결되기 쉽기 때문입니다."),
          qa("DR baseline은 왜 메인 테이블에 없나요?", "논문 본문 메인 비교는 Vanilla, SysID, DeltaDynamics, ASAP에 집중하고, stage 1에는 기본적인 domain randomization만 보조적으로 사용합니다."),
        ],
      ),
    },
    {
      section: "pretrain",
      chapter: "Reference",
      role: "Overview",
      title: "ASAP Framework Overview",
      subtitle: "The rest of the deck follows the exact stage order shown in the paper.",
      visual: paperImage(
        "assets/asap_figure2_pipeline.png",
        "Figure 2 from the paper: ASAP overview with pretraining, delta-action training, fine-tuning, and deployment.",
      ),
      points: [
        `Stage 1 pretrains a motion-tracking policy from retargeted human-video references.`,
        `Stage 2 collects real trajectories <strong>D^r = {s_0^r, a_0^r, ..., s_T^r, a_T^r}</strong>, trains a delta action model, and freezes it inside the simulator.`,
        `Policy fine-tuning is performed with <strong>PPO</strong> in the aligned simulator, while deployment still uses <strong>one policy</strong>.`,
        `The paper names the four blocks explicitly: <strong>pre-training and real trajectory collection</strong>, <strong>delta action model training</strong>, <strong>policy fine-tuning</strong>, and <strong>real-world deployment</strong>.`,
      ],
      ...note(
        "Figure 2를 그대로 따라가면 논문 구조가 가장 자연스럽게 정리됩니다. 먼저 human-video 기반 reference를 만들고, 그 reference를 따라가는 tracking policy를 시뮬레이터에서 학습합니다. 그 다음 실제 로봇에서 rollout을 모아서 delta action model을 학습하고, 그 model을 시뮬레이터 안에 고정한 뒤 tracking policy를 다시 fine-tune합니다. 마지막 배포 시점에는 delta model이 아니라 fine-tuned policy 하나만 실제 로봇에 올라갑니다.",
        "이 논문에서 stage 1은 behavior acquisition 단계이고, stage 2는 physics alignment 단계입니다. 따라서 두 단계를 섞지 않고 순서대로 보는 것이 발표와 이해 모두에 유리합니다.",
        [qa("왜 deployment 때 delta action model을 함께 쓰지 않나요?", "논문의 의도는 runtime patch보다 training-time simulator correction입니다. delta model은 policy가 더 나은 dynamics 아래서 다시 배우게 만들고, 최종 배포는 single-policy로 단순하게 유지합니다.")],
      ),
    },
    {
      section: "pretrain",
      chapter: "Reference",
      title: "Human-Video Retargeting Pipeline",
      subtitle: "The reference motion is reconstructed, cleaned, and retargeted before control learning begins.",
      visual: paperImage(
        "assets/asap_figure3_retargeting.png",
        "Figure 3 from the paper: human-video motion reconstruction and retargeting to Unitree G1.",
      ),
      points: [
        `The pipeline goes from <strong>video → TRAM reconstruction → SMPL motion → RL cleanup → G1 retargeting</strong>.`,
        `The target of retargeting is robot-feasible motion rather than direct replay of human geometry.`,
        `This matters because stage-2 transfer claims are only meaningful if the stage-1 reference is already physically sensible.`,
        `The paper explicitly uses <strong>TRAM</strong> for 3D reconstruction and <strong>SMPL</strong> as the intermediate human-body representation.`,
      ],
      ...note(
        "Figure 3는 stage 1 reference가 어떻게 만들어지는지 보여줍니다. 사람 비디오에서 시작해 TRAM으로 3차원 human motion을 SMPL 형식으로 복원하고, 그 motion을 simulation 안에서 RL로 한 번 더 정리한 뒤, 최종적으로 G1 morphology에 맞게 retarget합니다. 중요한 점은 사람 관절값을 그대로 복사하는 것이 아니라, 로봇이 실제로 추적 가능한 reference를 만드는 과정이라는 것입니다.",
        "TRAM은 monocular video 등으로부터 3차원 human motion을 복원하는 모듈이고, SMPL은 사람 몸의 shape와 pose를 파라미터로 표현하는 대표적인 body model입니다. retargeting은 이 human-centered representation을 로봇의 관절 구조와 morphology에 맞는 표현으로 바꾸는 단계입니다.",
        [
          qa("왜 RL cleanup 단계가 필요한가요?", "video reconstruction만으로는 noise와 physically implausible segment가 남을 수 있기 때문에, simulator 안에서 한 번 더 추적 가능한 형태로 정리할 필요가 있습니다."),
          qa("retargeting이 부정확하면 stage 2 해석도 흔들리나요?", "그렇습니다. reference 자체가 비현실적이면 transfer failure가 physics mismatch 때문인지 reference quality 때문인지 분리하기 어렵습니다."),
        ],
      ),
    },
    {
      section: "pretrain",
      chapter: "Policy",
      title: "Phase-Based Motion Tracking Policy",
      subtitle: "Stage 1 uses PPO with an asymmetric actor-critic, a phase-conditioned actor, and a 23-DoF PD-control interface.",
      layout: "wide",
      visual: {
        type: "table",
        headers: ["Component", "Paper detail", "Practical role"],
        rows: [
          ["Actor input", "5-step history of q, q̇, root angular velocity, projected gravity, previous action, phase", "Deployment-feasible proprioceptive input without odometry targets"],
          ["Critic input", "Actor input plus privileged reference global positions and root linear velocity", "Stabilizes training under partial observability"],
          ["Action", "23-dimensional target joint positions to a PD controller", "The same action interface later corrected by πΔ"],
          ["Optimizer", "PPO with asymmetric actor-critic", "Stable on-policy optimization for tracking"],
        ],
      },
      points: [
        `The actor is <strong>phase-based</strong>: timing information tells the controller where it is in the motion.`,
        `The actor observes a <strong>5-step history</strong> of joint state, root angular velocity, projected gravity, previous action, and phase.`,
        `Because the actor does not depend on position-based motion targets, the policy avoids odometry dependence at deployment.`,
        `The deployed actor outputs <strong>23-dimensional target joint positions</strong>, while the critic receives additional privileged reference information during PPO training.`,
      ],
      ...note(
        "stage 1 policy의 실제 설계는 여기 적힌 그대로입니다. actor는 5-step proprioceptive history와 phase variable을 보고 23차원 target joint position을 출력하고, 이 값은 PD controller로 내려갑니다. critic은 여기에 reference global position과 root linear velocity 같은 privileged information을 더 봅니다. 그리고 이 전체 policy는 PPO로 학습됩니다. 즉 paper의 핵심 policy는 phase-based motion-tracking policy이고, delta action도 결국 이 action interface 위에서 작동합니다.",
        "POMDP는 정책이 환경의 완전한 상태를 모두 관측할 수 없는 설정입니다. real humanoid control에서는 외부 절대 위치나 완전한 reference state를 actor가 항상 알 수 없기 때문에 POMDP로 보는 것이 자연스럽습니다.\n\nasymmetric actor-critic은 actor와 critic이 서로 다른 관측을 쓰는 구조입니다. actor는 실제 배포 가능한 입력만 쓰고, critic은 시뮬레이터에서만 볼 수 있는 privileged information을 추가로 써서 학습을 안정화합니다.\n\nPPO는 clipped objective를 쓰는 on-policy policy gradient 계열 알고리즘이고, PD controller는 high-level target joint position을 low-level motor command로 바꾸는 고전적인 feedback controller입니다.",
        [
          qa("왜 phase variable이 꼭 필요한가요?", "비슷한 pose라도 motion의 앞부분인지 뒷부분인지에 따라 다음 action이 달라지기 때문입니다. phase는 그 timing context를 제공합니다."),
          qa("왜 actor에서 odometry dependence를 피하려 하나요?", "실제 humanoid에서는 안정적인 global target tracking이 어렵기 때문입니다. 저자들은 phase-driven actor로 배포 복잡도를 낮추려 합니다."),
        ],
      ),
    },
    {
      section: "pretrain",
      chapter: "Policy",
      title: "Reward Terms for Pretraining",
      subtitle: "The pretraining reward trades off pose fidelity, contact quality, and control regularity.",
      layout: "wide",
      visual: paperImage(
        "assets/asap_table1_pretraining_rewards.png",
        "Table I from the paper: reward terms for pretraining.",
        "Table I from the paper: reward terms for pretraining.",
        { cover: true },
      ),
      points: [
        `The largest task-side weights are on <strong>VR 3-point</strong> and <strong>feet body position</strong>, showing that whole-body anchoring and foot placement matter strongly.`,
        `A large termination penalty of <strong>-200</strong> prevents the policy from exploiting unstable motions that look good briefly and fail immediately.`,
      ],
      ...note(
        "Table I를 보면 stage 1이 무엇을 중요하게 보는지 바로 드러납니다. penalty 쪽에서는 termination이 -200으로 매우 크고, joint limit과 torque limit도 강하게 들어가 있어서 무리한 동작을 억제합니다. task reward 쪽에서는 VR 3-point가 1.6, feet body position이 2.1로 비교적 크게 들어가 있어, 단순 joint angle matching보다 전신 anchor와 발 위치를 더 강하게 보려는 설계임을 알 수 있습니다. 즉 이 policy는 보기 좋은 포즈뿐 아니라 실제로 버티는 tracking을 목표로 합니다.",
        "reward shaping은 원하는 behavior를 여러 보상 항목의 가중합으로 표현하는 방식입니다. 이 논문은 motion fidelity와 stability를 따로 두지 않고, 하나의 tracking objective 안에 함께 묶어 학습합니다.\n\n논문은 `VR 3-point`라는 표기를 그대로 사용하지만, 본문에서 이 항목의 구현 세부를 길게 풀어 설명하지는 않습니다. 발표에서는 세 개의 핵심 body anchor를 포함하는 tracking term 정도로 소개하는 것이 가장 안전합니다.",
        [
          qa("왜 termination penalty가 이렇게 큰가요?", "jump나 balance 같은 동작은 잠깐만 버텨도 reward를 얻을 수 있기 때문에, 조기 붕괴를 강하게 벌하지 않으면 policy가 불안정한 shortcut을 학습할 수 있습니다."),
          qa("feet-related reward가 큰 이유는 무엇인가요?", "whole-body skill에서는 발 위치와 접지 타이밍이 다음 상태를 지배하기 때문에, feet tracking을 약하게 두면 전신 motion quality가 빠르게 무너집니다."),
        ],
      ),
    },
    {
      section: "pretrain",
      chapter: "Policy",
      title: "Stabilization Techniques for Stage-1 Training",
      subtitle: "The authors single out three training choices as necessary for difficult agile motions.",
      visual: {
        type: "sequence",
        items: [
          ["Asymmetric actor-critic", "Use privileged information only in the critic during training."],
          ["Termination curriculum", "Tighten the tracking-failure threshold from 1.5 m to 0.3 m over training."],
          ["Reference State Initialization", "Randomize the starting phase so landing and recovery can be learned in parallel."],
          ["Basic domain randomization", "Add robustness in stage 1 before any real-data alignment begins."],
        ],
      },
      points: [
        `Without curriculum and RSI, difficult motions fail too early and the policy never learns the later phases correctly.`,
        `The termination threshold is explicitly annealed from <strong>1.5 m</strong> to <strong>0.3 m</strong> as tracking improves.`,
      ],
      ...note(
        "저자들이 stable pretraining의 핵심이라고 직접 강조한 선택들이 바로 이 네 가지입니다. termination threshold를 처음에는 1.5미터로 느슨하게 두고 나중에 0.3미터까지 조이는 curriculum을 사용하고, RSI로 motion phase를 랜덤 초기화해서 landing과 recovery를 초반부터 병렬로 학습하게 만듭니다. 이 두 가지가 없으면 jump나 single-leg balance 같은 동작은 초반 실패만 반복하고 후반 phase를 거의 보지 못하게 됩니다.",
        "Reference State Initialization, 즉 RSI는 episode를 항상 motion의 시작점에서만 열지 않고, reference의 임의 phase에서 시작하도록 하는 기법입니다. 이렇게 하면 어려운 모션의 뒷부분, 특히 착지와 회복 구간을 초반부터 충분히 학습할 수 있습니다.\n\ntermination curriculum은 실패 판정을 점점 엄격하게 만드는 방식입니다. 먼저 대강 균형을 잡게 만들고, 그 다음 더 정확한 tracking을 요구하는 순서로 난이도를 올립니다.",
        [
          qa("왜 sequence learning처럼 처음부터 끝까지 순서대로 학습시키지 않나요?", "점프처럼 뒷부분이 특히 어려운 모션은 landing을 못 배우면 전체 sequence를 영원히 끝까지 못 보기 때문입니다."),
          qa("stage 1에서도 domain randomization을 쓰는데, 그럼 ASAP와 무엇이 다른가요?", "기본 randomization은 robustness 보조 수단이고, ASAP의 핵심은 실제 롤아웃으로 학습한 구조적 residual correction이라는 점이 다릅니다."),
        ],
      ),
    },
    {
      section: "pretrain",
      chapter: "Gap",
      title: "Pretrained Policy and Remaining Transfer Gap",
      subtitle: "The pretrained policy can already track in simulation and even run on hardware, but motion quality remains limited by physics mismatch.",
      visual: projectImage(
        "assets/motion_tracking.gif",
        "Stage-1 simulator tracking from the ASAP project page.",
      ),
      points: [
        `Stage 1 is strong enough to produce <strong>informative real rollouts</strong> instead of random failures.`,
        `The paper explicitly states that the pretrained policy can track in the real world, but <strong>does not achieve high motion quality</strong>.`,
        `ASAP therefore treats stage 2 as a transfer-repair step, not a skill-discovery step.`,
      ],
      ...note(
        "중요한 점은 stage 1이 약해서 실패하는 논문이 아니라는 것입니다. 저자들은 pretrained policy가 실제에서도 tracking은 되지만 motion quality가 충분히 좋지 않다고 말합니다. 즉 rollout을 모을 정도의 competence는 이미 확보되어 있고, 남은 문제는 simulator에서 배운 transition bias가 실제에서 자세와 타이밍을 어떻게 망가뜨리느냐입니다. 이 때문에 stage 2는 새 스킬 학습이 아니라 transfer repair 단계로 읽어야 합니다.",
        "motion quality라는 표현은 단순 성공/실패보다 더 넓은 개념입니다. tracking error, lower-body jerk, landing smoothness, recovery stability까지 포함하는 표현으로 이해하면 됩니다.",
        [qa("왜 stage 1 policy를 바로 더 오래 학습시키지 않나요?", "문제의 원인이 data 부족이 아니라 잘못된 simulator transition이라면, 같은 simulator에서 더 오래 학습해도 transfer error는 남을 가능성이 큽니다.")],
      ),
    },
    {
      section: "alignment",
      chapter: "Data",
      title: "Real-World Rollout Dataset",
      subtitle: "Stage 2 starts from measured state-action-next-state tuples collected with the pretrained policy on the robot.",
      layout: "wide",
      visual: {
        type: "table",
        headers: ["Recorded signal", "Dimension", "Acquisition"],
        rows: [
          ["p_base, v_base", "3 + 3", "Motion capture and state estimation"],
          ["α_base, ω_base", "4 + 3", "Orientation tracking and IMU"],
          ["q_t, q̇_t", "23 + 23", "Onboard joint sensing"],
          ["a_t", "23", "Policy output recorded on hardware"],
        ],
      },
      points: [
        `The real dataset is written as <strong>Dʳ = {sʳ₀, aʳ₀, ..., sʳ_T, aʳ_T}</strong>.`,
        `Replay starts from the measured real state, so the simulator is asked to reproduce the same local transition that the hardware experienced.`,
        `The measured state contains <strong>59 state dimensions</strong> before the 23-dimensional recorded action is considered.`,
      ],
      ...note(
        "stage 2의 출발점은 real rollout dataset입니다. 저자들은 pretrained policy를 실제 G1에 올려서 trajectory를 수집하고, 각 시점의 state와 action을 기록합니다. state에는 base position과 velocity, base orientation quaternion, angular velocity, 그리고 23개 관절의 position과 velocity가 포함됩니다. 이렇게 기록된 Dʳ가 바로 simulator alignment의 supervision 역할을 합니다.",
        "논문 표기에서 sᵣ_t는 실제 로봇에서 측정한 상태, aᵣ_t는 그 상태에서 실제로 실행된 action을 뜻합니다. base state를 함께 기록하는 이유는 whole-body motion에서는 전역 body motion과 joint motion이 모두 중요하기 때문입니다.",
        [
          qa("왜 action만이 아니라 full state를 자세히 기록해야 하나요?", "ASAP의 목적은 simulator가 같은 state-action에서 어떤 next state를 만드는지 맞추는 것이므로, base pose와 joint state를 모두 알아야 transition error를 계산할 수 있습니다."),
          qa("실제 데이터를 supervised regression처럼 바로 policy 학습에 쓰지 않는 이유는 무엇인가요?", "데이터 양이 제한적이기 때문에, 직접 imitation보다 simulator를 고쳐서 다시 RL을 돌리는 편이 데이터 재사용 측면에서 더 효율적이라는 것이 논문의 선택입니다."),
        ],
      ),
    },
    {
      section: "alignment",
      chapter: "Alignment",
      title: "Residual Action Policy Formulation",
      subtitle: "ASAP learns a residual action policy that makes simulated transitions match recorded real transitions.",
      visual: {
        type: "formula",
        items: [
          ["Delta action", "Δa<sub>t</sub> = π<sup>Δ</sup><sub>θ</sub>(s<sub>t</sub>, a<sub>t</sub>)"],
          ["Aligned dynamics", "s<sub>t+1</sub> = f<sup>sim</sup>(s<sub>t</sub>, a<sub>t</sub><sup>r</sup> + Δa<sub>t</sub>)"],
          ["Target", "s<sub>t+1</sub> ≈ s<sub>t+1</sub><sup>r</sup>"],
        ],
      },
      points: [
        `Each RL step initializes the simulator at the measured real state <strong>sʳ_t</strong>.`,
        `The reward minimizes next-state discrepancy to <strong>sʳ_{t+1}</strong> while regularizing action magnitude.`,
        `The delta policy itself is trained with <strong>PPO</strong>, not by one-step supervised fitting alone.`,
        `This choice preserves the <strong>same control interface</strong> used later by the motion-tracking policy.`,
        `The paper also adds an action-magnitude regularization term of the form <strong>exp(-‖a_t‖) - 1</strong> during residual-policy training.`,
      ],
      ...note(
        "ASAP의 핵심 수식은 이 residual action formulation입니다. simulator를 real state에서 시작시키고, 실제로 기록된 action aʳ_t에 state-dependent corrective action Δa_t를 더합니다. 그리고 그렇게 만든 simulator next state가 실제 next state sʳ_{t+1}에 가까워지도록 πΔ를 학습합니다. 즉 residual dynamics를 next state 쪽에서 직접 보정하는 것이 아니라, simulator가 받는 effective action을 보정하는 방식입니다.",
        "delta action model은 현재 state와 nominal action을 받아 corrective action을 출력하는 residual policy입니다. delta dynamics model은 보통 next state residual을 직접 예측하는 쪽을 말합니다. ASAP은 후자보다 전자를 택해 control interface와의 연결을 유지합니다.\n\n여기서 다시 PPO를 쓰는 이유는 rollout horizon을 가진 RL objective로 residual policy를 학습해 장기적인 replay mismatch까지 줄이려는 의도 때문입니다.",
        [
          qa("왜 residual을 supervised next-state regression으로 바로 학습하지 않나요?", "저자들은 horizon이 있는 dynamics compensation과 action regularization을 함께 다루기 위해 RL formulation을 선택합니다."),
          qa("왜 aʳ_t를 기반으로 correction을 더하나요?", "정렬하고 싶은 대상이 실제 로봇에서 이미 실행된 transition이기 때문입니다. 따라서 recorded action에 correction을 더한 simulator transition이 real next state를 재현해야 합니다."),
        ],
      ),
    },
    {
      section: "alignment",
      chapter: "Alignment",
      title: "Reward Terms for Residual Action Training",
      subtitle: "The delta policy is trained to correct transitions, so its reward is lighter on actuation and explicit about action magnitude.",
      layout: "wide",
      visual: paperImage(
        "assets/asap_table2_delta_rewards.png",
        "Table II from the paper: reward terms for delta action learning.",
        "Table II from the paper: reward terms for delta action learning.",
        { cover: true },
      ),
      points: [
        `Compared with pretraining, the torque penalty is much smaller (<strong>-0.1</strong> instead of <strong>-5.0</strong>) because πΔ is not the whole controller.`,
        `An explicit <strong>action-norm penalty</strong> is added so the residual remains corrective rather than dominating the base action.`,
        `Task-side weights are flattened to <strong>1.0 / 0.5</strong>-scale terms because the goal is transition correction rather than full behavior synthesis.`,
        `The regularization block is minimal: only <strong>action rate -0.01</strong> and <strong>action norm -0.2</strong> are retained.`,
      ],
      ...note(
        "Table II를 보면 delta action learning reward는 pretraining reward와 성격이 다릅니다. 여기서 πΔ는 전체 motion을 생성하는 policy가 아니라, base action을 얼마나 수정할지 결정하는 residual policy이기 때문에 torque penalty가 훨씬 약해지고, 대신 action norm penalty가 명시적으로 들어갑니다. regularization도 action rate와 action norm 두 항목으로 단순화돼 있습니다. task-side tracking term은 여전히 body position, rotation, velocity, joint position 같은 항목으로 구성되지만, 전체 목적은 motion generation이 아니라 transition correction입니다.",
        "action norm regularization은 residual이 너무 커져서 base policy를 덮어쓰지 않도록 막는 장치입니다. 즉 correction은 필요하지만, correction이 nominal command를 completely replace하도록 만들지는 않겠다는 제약으로 이해하면 됩니다.",
        [qa("왜 torque penalty를 이렇게 줄이나요?", "πΔ는 원래 action에 덧붙는 correction이기 때문에, pretraining policy만큼 강한 actuation penalty를 주면 필요한 보정까지 억누를 수 있기 때문입니다.")],
      ),
    },
    {
      section: "alignment",
      chapter: "Fine-Tuning",
      title: "Aligned Simulation and Policy Fine-Tuning",
      subtitle: "After delta-action training, the residual is frozen inside the simulator and the tracking policy is fine-tuned again with PPO.",
      visual: {
        type: "pipeline",
        steps: [
          ["Collect real rollouts", "Run the pretrained motion-tracking policy on hardware."],
          ["Train πΔ", "Learn corrective actions that reduce replay mismatch."],
          ["Freeze πΔ in the simulator", "Treat the residual as part of the aligned transition function."],
          ["Fine-tune the policy", "Re-optimize the tracking policy with PPO under the aligned simulator."],
          ["Deploy one policy", "Run only the fine-tuned tracking policy on the robot."],
        ],
      },
      points: [
        `The final runtime system is still <strong>a single policy</strong>; the residual model is a training-time alignment mechanism.`,
        `Fine-tuning remains necessary because improved local transitions change the state distribution and the recovery strategy the policy must learn.`,
        `The paper compares this PPO fine-tuning step against fixed-point and gradient-search alternatives later in the analysis section.`,
      ],
      ...note(
        "delta action model을 학습한 뒤에는 그것을 simulator 안에 고정하고, motion-tracking policy를 다시 PPO로 fine-tune합니다. 이 순서가 중요한 이유는 residual이 one-step transition bias를 줄여도, 그 위에서 policy가 방문하게 되는 state distribution 자체는 다시 달라지기 때문입니다. 따라서 aligned simulator가 만들어졌다고 해서 base policy를 그대로 쓰는 것으로 끝나지 않고, 그 dynamics에 맞는 feedback behavior를 policy가 다시 학습해야 합니다.",
        "freeze한다는 것은 πΔ를 더 이상 업데이트하지 않고, simulator transition의 일부처럼 취급한다는 뜻입니다. 이렇게 해야 나중 fine-tuning에서 policy가 어떤 물리 아래서 학습되는지가 고정되고, residual과 policy가 서로 불안정하게 co-adapt하는 문제를 줄일 수 있습니다.",
        [
          qa("왜 πΔ와 policy를 end-to-end로 같이 학습하지 않나요?", "논문은 먼저 real-data alignment를 고정한 뒤 policy adaptation을 수행하는 두 단계 구조가 해석 가능성과 안정성 면에서 더 낫다고 봅니다."),
          qa("deployment 때 single-policy라는 점이 왜 중요하죠?", "runtime stack이 복잡해지지 않고, method의 이득이 simulator-side training improvement로 귀결된다는 점을 분명하게 보여주기 때문입니다."),
        ],
      ),
    },
    {
      section: "evidence",
      chapter: "Protocol",
      role: "Overview",
      title: "Experimental Questions and Metrics",
      subtitle: "The paper organizes evidence around six questions; the main talk needs the first three plus the supporting analyses.",
      layout: "wide",
      visual: {
        type: "table",
        headers: ["Question", "Protocol", "Decision signal"],
        rows: [
          ["Q1", "Open-loop replay in IsaacGym using IsaacSim / Genesis trajectories", "Does simulator alignment reduce replay mismatch?"],
          ["Q2", "Closed-loop policy fine-tuning then deployment in IsaacSim / Genesis", "Does the aligned simulator produce a better controller?"],
          ["Q3", "Real-world evaluation on Unitree G1", "Does the transfer improvement survive on hardware?"],
          ["Q4–Q6", "Ablations on data size, horizon, delta usage, noise, and joint structure", "Why does ASAP work and how should it be used?"],
        ],
      },
      points: [
        `The main metrics are <strong>Success</strong>, <strong>E_g-mpjpe</strong>, <strong>E_mpjpe</strong>, <strong>E_acc</strong>, and <strong>E_vel</strong>.`,
        `A trial is marked unsuccessful when the average body-distance error exceeds <strong>0.5 m</strong> during imitation.`,
        `The evaluation order is deliberate: <strong>replay quality → controller quality → real-world quality → ablation-based interpretation</strong>.`,
      ],
      ...note(
        "결과 파트는 이 네 줄만 기억하시면 됩니다. Q1은 aligned simulator가 정말 real transition을 더 잘 재현하느냐, Q2는 그 simulator에서 다시 학습한 policy가 실제로 더 좋은 controller냐, Q3는 그 이득이 real robot에 살아남느냐, 그리고 Q4부터 Q6은 왜 이런 결과가 나왔는지를 푸는 분석입니다. 발표에서는 이 순서대로 읽는 것이 가장 깔끔합니다.",
        "E_g-mpjpe는 global body position 기준의 tracking error이고, E_mpjpe는 root-relative mean per-joint position error입니다. E_acc는 acceleration error, E_vel은 root velocity error입니다. Success는 tracking 도중 average body-distance error가 0.5미터를 넘지 않았는지로 판정합니다.",
        [
          qa("왜 E_g-mpjpe와 E_mpjpe를 둘 다 보나요?", "global drift와 local pose quality를 분리해서 보기 위해서입니다. 두 지표를 함께 봐야 전체 motion quality를 더 정확히 해석할 수 있습니다."),
          qa("Success threshold 0.5 m는 어떤 의미인가요?", "그 정도 이상 body-distance error가 벌어지면 tracking이 사실상 실패했다고 보는 operational criterion입니다."),
        ],
      ),
    },
    {
      section: "evidence",
      chapter: "Simulation",
      title: "Open-Loop Replay Protocol",
      subtitle: "Replay isolates dynamics mismatch by removing policy adaptation and asking whether the simulator can reproduce a recorded trajectory.",
      visual: paperImage(
        "assets/asap_figure4_replay.png",
        "Figure 5 from the paper: replaying IsaacSim trajectories in IsaacGym under different correction methods.",
      ),
      points: [
        `The figure replays the same IsaacSim state-action trajectory in IsaacGym under Vanilla, SysID, DeltaDynamics, and ASAP.`,
        `The bottom MPJPE curves show that <strong>ASAP accumulates mismatch more slowly over time</strong>.`,
        `The paper explicitly notes that πΔ is trained across multiple motions, so this is not a one-clip overfit example.`,
        `Replay is reported at <strong>0.25 s, 0.5 s, and 1.0 s</strong> horizons in Table III.`,
      ],
      ...note(
        "open-loop replay는 policy adaptation을 완전히 제거하고 dynamics matching만 보는 실험입니다. 즉 testing environment에서 기록한 trajectory를 training environment에서 같은 초기 state와 action sequence로 재생해 보고, 얼마나 빨리 tracking error가 커지는지를 측정합니다. Figure 5에서 ASAP이 가장 천천히 깨진다는 것은 simulator alignment 자체가 더 잘 됐다는 뜻입니다.",
        "open-loop이라는 말은 policy가 중간에 feedback으로 correction하지 않는다는 뜻입니다. 그래서 이 실험은 controller quality보다 transition model quality를 더 직접적으로 봅니다.",
        [qa("왜 open-loop replay가 먼저 필요한가요?", "closed-loop 결과만 보면 policy adaptation 효과와 simulator alignment 효과가 섞이기 때문에, 먼저 transition matching 자체를 분리해서 확인할 필요가 있습니다.")],
      ),
    },
    {
      section: "evidence",
      chapter: "Simulation",
      title: "Open-Loop Replay Results (Table III)",
      subtitle: "The longest replay horizon shows the clearest separation between methods, so 1.0 s is the most informative row.",
      layout: "wide",
      visual: paperImage(
        "assets/asap_table3_open_loop.png",
        "Table III from the paper: open-loop performance comparison across simulators and motion lengths.",
        "Table III from the paper: open-loop performance comparison across simulators and motion lengths.",
        { cover: true },
      ),
      points: [
        `At <strong>1.0 s replay</strong>, ASAP cuts IsaacSim global error from <strong>80.8</strong> to <strong>37.9</strong>.`,
        `On Genesis, it cuts global error from <strong>82.5</strong> to <strong>36.9</strong> and root-velocity error from <strong>11.4</strong> to <strong>5.10</strong>.`,
        `SysID helps modestly, while DeltaDynamics improves some local pose metrics but remains weaker on long-horizon global drift.`,
        `At <strong>0.5 s</strong>, ASAP is also strongest on IsaacSim global error (<strong>26.8</strong> versus <strong>33.3</strong> for OpenLoop) while keeping acceleration and velocity errors lowest.`,
      ],
      ...note(
        "Table III는 horizon이 늘어날수록 method 차이가 어떻게 벌어지는지를 잘 보여줍니다. 0.25초에서는 거의 차이가 없지만, 0.5초부터 ASAP이 OpenLoop보다 확실히 낮은 global error를 보이기 시작하고, 1.0초에서는 그 차이가 매우 커집니다. 특히 IsaacSim 기준 E_g-mpjpe가 80.8에서 37.9로, Genesis 기준 82.5에서 36.9로 줄어든다는 점이 핵심입니다. 즉 단순히 one-step fit이 아니라 rollout 전체의 transition quality가 좋아졌다고 읽을 수 있습니다.",
        "long-horizon replay가 중요한 이유는 local one-step fit만 잘하는 모델과, 시간이 지나도 drift를 덜 일으키는 모델을 구분해 주기 때문입니다. transfer에서는 후자가 훨씬 중요합니다.",
        [
          qa("왜 DeltaDynamics는 E_m이 낮은데도 ASAP보다 약하다고 보나요?", "local joint pose error가 낮아도 global drift와 long-horizon stability가 남아 있으면 closed-loop transfer에는 불리할 수 있기 때문입니다."),
          qa("SysID가 거의 안 듣는 것처럼 보이는데, 그 해석이 맞나요?", "전혀 안 듣는 것은 아니지만, state-dependent local bias를 전역 simulator parameter 몇 개로만 맞추는 데는 한계가 있다는 해석이 더 정확합니다."),
        ],
      ),
    },
    {
      section: "evidence",
      chapter: "Simulation",
      title: "Closed-Loop Motion Imitation Results",
      subtitle: "The next question is whether the aligned simulator produces a better controller rather than only better replay curves.",
      visual: paperImage(
        "assets/asap_figure5_difficulty.png",
        "Figure 6 from the paper: qualitative comparisons across easy, medium, and hard motions.",
      ),
      points: [
        `Closed-loop evaluation covers IsaacGym→IsaacSim and IsaacGym→Genesis across <strong>easy, medium, and hard</strong> motions.`,
        `ASAP is the only method that maintains <strong>100% success</strong> across all difficulty levels in both test simulators.`,
        `The hard split is the most informative because it exposes cumulative contact and recovery errors immediately.`,
        `For example, on <strong>medium Genesis</strong>, success improves from <strong>94.3%</strong> to <strong>100%</strong> and E_g-mpjpe improves from <strong>169</strong> to <strong>126</strong>.`,
      ],
      ...note(
        "이제는 simulator를 잘 맞췄다는 사실만으로는 부족하고, 그 simulator에서 다시 학습한 policy가 실제로 더 나은 controller인지 봐야 합니다. Figure 6은 easy, medium, hard motion 전반에서 qualitative comparison을 보여주고, Table IV는 그 결과를 수치화합니다. 중요한 요점은 ASAP이 두 testing simulator 모두에서 success rate를 일관되게 유지한다는 점입니다.",
        "closed-loop evaluation은 policy가 매 timestep state feedback을 받아 action을 다시 계산하는 상황입니다. 따라서 replay보다 훨씬 deployment에 가까운 실험입니다.",
        [qa("왜 hard split을 따로 강조하나요?", "hard motion은 small mismatch를 빠르게 실패로 키우기 때문에, method의 transfer quality를 가장 날카롭게 분리해 주기 때문입니다.")],
      ),
    },
    {
      section: "evidence",
      chapter: "Simulation",
      title: "Representative Rows from Table IV",
      subtitle: "Representative rows show that the gain grows with task difficulty, especially in Genesis.",
      layout: "wide",
      visual: paperImage(
        "assets/asap_table4_closed_loop.png",
        "Table IV from the paper: closed-loop motion imitation evaluation across simulators.",
        "Table IV from the paper: closed-loop motion imitation evaluation across simulators.",
        { cover: true },
      ),
      points: [
        `In hard Genesis motions, ASAP improves <strong>E_g-mpjpe 175 → 129</strong> and restores success from <strong>82.9% → 100%</strong>.`,
        `The practical pattern is that gains are small when the task is already easy, but become substantial once simulator mismatch starts to accumulate.`,
      ],
      ...note(
        "Table IV를 representative row로 읽으면 논문의 메시지가 더 분명해집니다. Easy IsaacSim처럼 이미 쉬운 조건에서는 개선 폭이 크지 않지만, Medium Genesis와 Hard Genesis로 갈수록 ASAP의 이득이 커집니다. 특히 Hard Genesis에서 success가 82.9%에서 100%로 회복되고, E_g-mpjpe가 175에서 129로 줄어드는 것이 가장 강한 evidence입니다.",
        "E_g와 E_m을 함께 보는 이유는 global drift와 local pose quality를 분리하기 위해서입니다. hard transfer에서는 이 둘 중 하나만 좋아서는 충분하지 않고, success rate까지 같이 봐야 합니다.",
        [qa("왜 난이도가 높아질수록 ASAP의 이득이 커지나요?", "작은 dynamics mismatch가 hard motion에서는 contact timing과 recovery failure로 더 빠르게 증폭되기 때문입니다.")],
      ),
    },
    {
      section: "evidence",
      chapter: "Simulation",
      title: "Qualitative Fine-Tuning Results",
      subtitle: "The visual evidence is consistent with the table: lower-body jitter and temporal drift are reduced after ASAP fine-tuning.",
      visual: paperImage(
        "assets/asap_figure6_sim2sim.png",
        "Figure 7 from the paper: before/after fine-tuning in IsaacSim and Genesis.",
      ),
      points: [
        `The paper visualizes LeBron James' <strong>Silencer</strong> and <strong>single-foot balance</strong> before and after fine-tuning.`,
        `The improvement is most visible after the dynamic event, where timing and lower-body recovery no longer drift as quickly.`,
      ],
      ...note(
        "Figure 7은 Table IV 숫자를 시각적으로 확인시켜 주는 장면입니다. ASAP fine-tuning 전에는 동적 이벤트 직후 lower-body가 더 jerky하고 tracking이 빠르게 흩어지는데, fine-tuning 후에는 자세와 timing이 더 오래 유지됩니다. 즉 aligned simulator에서 다시 학습한 policy가 단순히 metric만 조금 나아진 것이 아니라, 실제 closed-loop behavior의 질도 좋아졌다고 볼 수 있습니다.",
        "qualitative figure는 quantitative table을 보조하는 역할을 합니다. 특히 whole-body skill에서는 숫자만으로는 lower-body jerk나 recovery smoothness를 충분히 전달하기 어렵기 때문에 이런 그림이 중요합니다.",
        [qa("이 qualitative figure가 꼭 필요한 이유는 무엇인가요?", "whole-body motion에서는 동일한 MPJPE 수준에서도 jerk, timing drift, recovery smoothness가 다를 수 있기 때문에, 숫자와 시각 자료를 같이 보는 편이 더 설득력 있습니다.")],
      ),
    },
    {
      section: "evidence",
      chapter: "Real World",
      title: "Real-World Experimental Protocol",
      subtitle: "The real-world study is intentionally practical: safe enough to execute, but still dynamic enough to show the transfer gap.",
      visual: {
        type: "cards",
        cols: 3,
        items: [
          ["Task set", "Kick, jump forward, step forward and back, single-foot balance, and single-foot jump."],
          ["Data constraint", "Training the full 23-DoF delta action model would require more than 400 motion clips."],
          ["Deployment bridge", "A locomotion policy with command (v, ω, Π) keeps balance between motion-tracking tasks."],
        ],
      },
      points: [
        `Because data collection was expensive and failure-prone, the real-robot study learns only a <strong>4-DoF lower-body delta model</strong>.`,
        `The paper reports that two Unitree G1 robots broke during collection because highly dynamic motions quickly overheated the hardware.`,
        `A separate locomotion policy handles task transitions with command <strong>(v, ω, Π)</strong> so the robot can recover balance without manual resets.`,
      ],
      ...note(
        "real-world protocol은 이 논문의 실용성을 잘 보여줍니다. 저자들은 안전성과 대표성을 함께 고려해 다섯 개의 motion-tracking task를 골랐고, 각 task 사이의 전환은 locomotion policy가 맡도록 만들었습니다. 그런데 full 23-DoF delta action model을 실제 데이터로 학습하려면 400개가 넘는 clip이 필요했고, dynamic motion 수집 중 모터 과열과 하드웨어 손상이 심해서 두 대의 G1이 고장났다고 직접 보고합니다. 그래서 real-robot 실험에서는 4-DoF lower-body delta로 타협합니다.",
        "in-distribution motion은 delta model 학습과 가까운 motion family를 뜻하고, out-of-distribution motion은 그 분포 밖의 motion을 뜻합니다. locomotion command의 (v, ω, Π)는 선속도, 각속도, 그리고 보행/정지 명령을 의미합니다.",
        [
          qa("왜 real-world에서는 23-DoF가 아니라 4-DoF delta만 쓰나요?", "데이터 수집 비용과 하드웨어 부담이 너무 커서, lower-body 중심의 더 sample-efficient한 설정으로 평가를 진행했기 때문입니다."),
          qa("이 설정이 method의 한계인가요, 실험 budget의 한계인가요?", "둘 다 일부 반영되어 있지만, 논문 문맥상 직접적인 이유는 real rollout collection cost와 hardware fragility입니다."),
        ],
      ),
    },
    {
      section: "evidence",
      chapter: "Real World",
      title: "Real-World Closed-Loop Evaluation",
      subtitle: "The same intervention improves both an in-distribution motion and an out-of-distribution motion on hardware.",
      visual: paperImage(
        "assets/asap_figure7_real_before_after.png",
        "Figure 8 from the paper: real G1 motion before and after ASAP fine-tuning.",
      ),
      points: [
        `<strong>Kick.</strong> E_g-mpjpe <strong>61.2 → 50.2</strong>, E_mpjpe <strong>43.5 → 40.1</strong>, E_acc <strong>2.96 → 2.46</strong>, E_vel <strong>2.91 → 2.70</strong>.`,
        `<strong>LeBron \"Silencer\" (OOD).</strong> E_g-mpjpe <strong>159 → 112</strong>, E_mpjpe <strong>55.3 → 47.5</strong>, E_acc <strong>3.43 → 2.84</strong>, E_vel <strong>6.43 → 5.94</strong>.`,
        `The OOD gain matters because it suggests the residual captures <strong>reusable dynamics bias</strong>, not only one memorized trajectory.`,
        `Both tasks improve across <strong>all four reported metrics</strong>, which is important because smoother motion alone would not guarantee better tracking fidelity.`,
      ],
      ...note(
        "Table V와 Figure 8이 real-world 결과의 핵심입니다. kick처럼 in-distribution motion에서도 모든 지표가 개선되지만, 더 중요한 것은 LeBron Silencer처럼 out-of-distribution motion에서도 E_g-mpjpe가 159에서 112로, E_mpjpe가 55.3에서 47.5로 줄어든다는 점입니다. 즉 learned residual이 특정 한 motion의 patch가 아니라, hardware dynamics의 reusable bias를 어느 정도 포착했다고 해석할 수 있습니다.",
        "out-of-distribution improvement가 중요한 이유는 method의 일반화 가능성을 보여주기 때문입니다. 만약 특정 motion에서만 좋아진다면 simulator alignment라기보다 narrow overfitting에 가까운 해석이 될 수 있습니다.",
        [
          qa("4-DoF lower-body delta만으로도 OOD gain이 나는 이유는 무엇일까요?", "저자들의 해석대로라면 sim-to-real gap의 큰 부분이 lower-body contact chain에 집중되어 있기 때문입니다."),
          qa("real-world metric 개선 폭이 simulator-to-simulator보다 작아 보이는데 괜찮나요?", "하드웨어는 noise, sensing, safety constraint가 더 크기 때문에 absolute improvement를 그대로 비교하기보다, OOD에서도 일관되게 좋아졌다는 점을 보는 편이 더 적절합니다."),
        ],
      ),
    },
    {
      section: "evidence",
      chapter: "Real World",
      title: "Real-World Metrics (Table V)",
      subtitle: "The real-robot comparison reports one in-distribution motion and one out-of-distribution motion with the same metric set.",
      layout: "wide",
      visual: paperImage(
        "assets/asap_table5_real_world.png",
        "Table V from the paper: real-world closed-loop performance with and without ASAP fine-tuning.",
        "Table V from the paper: real-world closed-loop performance with and without ASAP fine-tuning.",
        { cover: true },
      ),
      points: [
        `The gain is not confined to one metric: <strong>global tracking, local pose, acceleration, and velocity</strong> all improve after ASAP fine-tuning.`,
        `The larger absolute gain on the OOD motion is consistent with the claim that the residual captures reusable lower-body dynamics bias.`,
      ],
      ...note(
        "Table V를 표로만 다시 읽어 보면 논문의 real-world claim이 더 명확해집니다. Kick에서는 네 지표가 모두 조금씩 좋아지고, LeBron Silencer 같은 out-of-distribution motion에서는 개선 폭이 훨씬 큽니다. 특히 E_g-mpjpe가 159에서 112로 크게 줄어들고, E_vel도 6.43에서 5.94로 줄어들기 때문에 단순 pose matching뿐 아니라 동작의 전역 진행과 속도 프로파일도 더 안정화됐다고 볼 수 있습니다.",
        "in-distribution motion은 delta model이 본 motion family와 가까운 경우이고, out-of-distribution motion은 그렇지 않은 경우입니다. 발표에서는 OOD 개선이 residual의 재사용 가능성을 보여주는 가장 중요한 실험 중 하나라고 짚으면 충분합니다.",
        [
          qa("왜 OOD 결과가 이 논문에서 특히 중요하나요?", "특정 trajectory patch가 아니라 실제 hardware bias를 어느 정도 모델링했다는 해석이 가능해지기 때문입니다."),
          qa("real-world에서 어떤 지표를 가장 우선해서 봐야 하나요?", "E_g-mpjpe와 E_vel을 먼저 보고, 그 다음 local pose quality를 E_mpjpe로 확인하는 순서가 가장 실용적입니다."),
        ],
      ),
    },
    {
      section: "evidence",
      chapter: "Real World",
      title: "Forward-Jump Demonstration on Unitree G1",
      subtitle: "The paper also demonstrates a forward leap of more than 1 m on the 1.35 m Unitree G1.",
      variant: "hero",
      visual: paperImage(
        "assets/asap_figure8_real_jump.png",
        "Figure 9 from the paper: real-world forward-jump deployment on Unitree G1.",
        "Figure 9 from the paper: real-world forward-jump deployment on Unitree G1.",
        { cover: true },
      ),
      points: [
        `The demonstrated jump exceeds <strong>1 m forward</strong> on the <strong>1.35 m</strong> Unitree G1 and illustrates the dynamic regime targeted by the paper.`,
      ],
      ...note(
        "Figure 9는 capability demonstration으로 읽는 편이 가장 적절합니다. 1.35미터 키의 G1이 1미터가 넘는 forward leap를 수행한다는 것은, 이 논문이 겨냥하는 동작 영역이 얼마나 공격적인지를 잘 보여줍니다. 다시 말해 ASAP은 쉬운 locomotion transfer가 아니라, conservative policy로는 쉽게 무너지는 high-impulse skill transfer를 목표로 합니다.",
        "capability demonstration은 benchmark와 다르게, method가 어떤 수준의 behavior regime까지 도달했는지를 보여주는 자료입니다. 발표에서는 정량 결과와 분리해서 보는 편이 좋습니다.",
        [qa("이 장면이 실험 결과에서 어떤 의미를 갖나요?", "정량 평가를 보완하는 capability evidence입니다. 논문이 정말 보존하려는 agility regime가 어떤 것인지 직관적으로 보여줍니다.")],
      ),
    },
    {
      section: "evidence",
      chapter: "Analysis",
      title: "Sensitivity to Dataset Size, Horizon, and Action Norm",
      subtitle: "The delta model is sensitive to what data it sees and how far it is asked to reason.",
      visual: paperImage(
        "assets/asap_figure9_ablation_size_horizon.png",
        "Figure 10 from the paper: dataset size, training horizon, and action-norm study.",
      ),
      points: [
        `The dataset-size sweep spans <strong>43, 430, 4300, and 43000</strong> samples.`,
        `Scaling the dataset from <strong>4300</strong> to <strong>43000</strong> samples reduces closed-loop error by only <strong>0.65%</strong>.`,
        `Open-loop replay continues improving up to <strong>1.5 s</strong>, but the best closed-loop result is at <strong>1.0 s</strong>.`,
        `The best action-norm weight is around <strong>0.1</strong>; larger values over-constrain the residual.`,
      ],
      ...note(
        "Figure 10은 delta action model을 어떻게 학습해야 하는지에 대한 가장 practical한 가이드를 줍니다. 첫째, dataset size를 4300에서 43000으로 늘려도 closed-loop 성능은 0.65%만 좋아집니다. 즉 무조건 데이터 양을 키우는 것보다 informative coverage를 확보하는 것이 더 중요합니다. 둘째, open-loop 기준으로는 1.5초 horizon이 가장 좋지만, closed-loop에서는 1.0초가 최적점입니다. 셋째, action norm weight는 0.1 근처가 가장 좋고, 너무 크면 residual이 과하게 제약됩니다.",
        "action norm은 residual action의 크기를 억제하는 regularization입니다. 너무 약하면 correction이 불안정해지고, 너무 강하면 필요한 bias correction까지 막아버릴 수 있습니다. dataset size 실험은 결국 quantity보다 coverage가 중요하다는 메시지로 읽는 편이 가장 실용적입니다.",
        [
          qa("왜 더 많은 데이터가 거의 도움이 안 되나요?", "주요 mismatch mode를 이미 커버한 뒤에는 비슷한 rollout이 반복되기 때문입니다. 이 논문은 quantity보다 coverage가 중요하다는 쪽에 가깝습니다."),
          qa("왜 open-loop best horizon과 closed-loop best horizon이 다른가요?", "longer horizon은 replay fitting에는 좋을 수 있지만, policy adaptation까지 포함한 closed-loop fine-tuning에서는 optimization difficulty와 distribution shift가 함께 작용하기 때문입니다."),
        ],
      ),
    },
    {
      section: "evidence",
      chapter: "Analysis",
      title: "Policy Fine-Tuning Strategies with a Learned Delta Model",
      subtitle: "The paper compares three ways to use a learned delta model once it exists.",
      visual: paperImage(
        "assets/asap_figure10_delta_finetune.png",
        "Figure 11 from the paper: RL fine-tuning versus fixed-point iteration and gradient search.",
      ),
      points: [
        `RL fine-tuning achieves the <strong>lowest tracking error over time</strong>.`,
        `Fixed-point iteration and gradient search are training-free, but the paper argues they are too myopic and suffer from out-of-distribution states.`,
        `This is strong evidence that <strong>aligned dynamics alone are not enough</strong>; policy adaptation remains necessary.`,
        `The paper explicitly reports that both training-free alternatives perform worse than the PPO fine-tuning curve during deployment.`,
      ],
      ...note(
        "Figure 11은 delta action model이 있으면 그다음 무엇을 해야 하는지를 묻는 실험입니다. fixed-point iteration이나 gradient search처럼 training-free하게 correction만 계산해서 쓰는 방법도 가능하지만, 논문 결과는 RL fine-tuning이 가장 낮은 tracking error를 보여준다고 말합니다. 저자들의 해석은 분명합니다. dynamics alignment는 필요하지만, 그 위에서 policy가 새 상태 분포에 맞게 feedback behavior를 다시 배워야 진짜 transfer gain이 나온다는 것입니다.",
        "fixed-point iteration은 correction을 반복적으로 적용해 self-consistent action을 찾으려는 방식이고, gradient search는 objective를 기준으로 action을 직접 최적화하는 접근입니다. 둘 다 training-free라는 장점은 있지만, distribution shift에 약하고 closed-loop policy를 재구성하지 못합니다. PPO fine-tuning이 필요한 이유를 가장 직접적으로 설명해 주는 실험이라고 보시면 됩니다.",
        [qa("이 결과가 왜 중요한가요?", "ASAP의 핵심이 단순 residual fitting이 아니라 aligned simulator 안에서의 재학습이라는 점을 가장 직접적으로 뒷받침하기 때문입니다.")],
      ),
    },
    {
      section: "evidence",
      chapter: "Analysis",
      title: "Comparison with Random Action Noise",
      subtitle: "The authors explicitly test whether the gain can be explained by generic robustness from action perturbation.",
      visual: paperImage(
        "assets/asap_figure11_noise.png",
        "Figure 12 from the paper: random action noise versus ASAP fine-tuning.",
      ),
      points: [
        `The noise sweep studies <strong>β ∈ [0.025, 0.4]</strong>, with the useful range concentrated in <strong>[0.025, 0.2]</strong>.`,
        `The best action-noise policy still reaches about <strong>173 MPJPE</strong>, whereas ASAP reaches <strong>126 MPJPE</strong>.`,
        `The gap suggests that delta action provides <strong>structured correction</strong> beyond generic robustness injection.`,
      ],
      ...note(
        "Figure 12는 매우 중요한 반박 실험입니다. 혹시 ASAP의 gain이 residual modeling이 아니라 단순히 noisy action으로 policy를 더 robust하게 만든 효과일 수 있지 않느냐는 질문에 답합니다. 결과는 noise도 어느 정도 도움이 되지만, best noise가 173 MPJPE인 반면 ASAP은 126 MPJPE로 훨씬 낮다는 것입니다. 따라서 delta action은 uniform robustness trick보다 더 구조적인 correction을 담고 있다고 보는 편이 타당합니다.",
        "random action noise는 domain randomization의 한 형태로, action에 임의 perturbation을 더해 policy robustness를 높이려는 접근입니다. 하지만 구조적 hardware bias가 joint별로 다르면 uniform noise만으로는 충분하지 않을 수 있습니다.",
        [qa("그렇다면 basic domain randomization은 무의미한가요?", "무의미한 것은 아닙니다. 다만 이 논문이 겨냥하는 state-dependent structured mismatch를 대체하기에는 한계가 있다는 것이 핵심입니다.")],
      ),
    },
    {
      section: "takeaways",
      chapter: "Interpretation",
      title: "Joint-Wise Structure of the Learned Residuals",
      subtitle: "The learned correction is concentrated, asymmetric, and physically interpretable rather than uniform across the body.",
      visual: paperImage(
        "assets/asap_figure12_delta_structure.png",
        "Figure 13 from the paper: average absolute delta-action magnitude per joint.",
      ),
      points: [
        `Larger residual magnitude appears in the <strong>lower body</strong>, especially around knee and ankle joints.`,
        `The paper highlights the <strong>ankle pitch joint</strong> as showing the most significant discrepancy in the illustrated IsaacGym→IsaacSim setting.`,
        `Left-right asymmetries remain visible, consistent with hardware-specific actuation and contact bias.`,
        `This pattern supports the claim that πΔ models <strong>structured dynamics mismatch</strong> better than uniform noise.`,
      ],
      ...note(
        "Figure 13은 learned residual을 어떻게 해석해야 하는지 보여줍니다. correction이 몸 전체에 균일하게 뿌려지지 않고 lower body, 특히 knee와 ankle 주변에 더 크게 집중됩니다. 또 좌우 비대칭도 남아 있습니다. 이는 residual이 arbitrary jitter가 아니라, 실제 하드웨어의 contact chain과 actuation bias를 구조적으로 반영하고 있음을 시사합니다.",
        "여기서 residual magnitude는 데이터셋 전체에서 각 joint에 대해 출력된 delta action의 평균 절대값입니다. 값이 큰 joint일수록 simulator와 hardware의 유효 dynamics gap이 더 크게 드러난다고 볼 수 있습니다.",
        [qa("왜 lower-body에 residual이 집중되는 것이 자연스럽나요?", "agile motion transfer에서 가장 큰 mismatch가 접지와 착지, balance recovery를 담당하는 lower-body contact chain에 모이기 쉽기 때문입니다.")],
      ),
    },
    {
      section: "takeaways",
      chapter: "Interpretation",
      title: "Scope and Limitations",
      subtitle: "ASAP is a targeted transfer method, not a universal replacement for simulator modeling.",
      visual: {
        type: "compare",
        rows: [
          ["Coverage requirement", "Needs informative real rollouts", "The residual cannot fix failure modes it never observes."],
          ["Representation limit", "Action residual is a local bias model", "A global simulator defect may be too large for this representation alone."],
          ["Experimental scope", "Unitree G1 and selected motions", "The real-robot study uses a 4-DoF lower-body residual under a constrained data budget."],
        ],
      },
      points: [
        `ASAP is strongest when stage 1 is already competent and the remaining weakness is transfer bias.`,
        `If the simulator is globally wrong or rollout coverage is too narrow, the residual has limited room to help.`,
      ],
      ...note(
        "이 논문을 과대해석하지 않으려면 한계도 분명히 봐야 합니다. ASAP은 simulator 전체를 다시 배우는 방법이 아니라, action interface에서 드러나는 local, state-dependent bias를 보정하는 방법입니다. 따라서 rollout coverage가 좁으면 못 본 failure mode는 고칠 수 없고, simulator가 전반적으로 너무 틀리면 residual 하나로는 부족할 수 있습니다. 또한 real-robot 검증도 G1과 선택된 motion, 그리고 4-DoF lower-body residual이라는 제한 아래에서 이뤄집니다.",
        "coverage는 rollout dataset이 어떤 상태와 motion regime를 포함하느냐를 뜻합니다. local bias model이라는 표현은 residual이 simulator를 완전히 대체하는 것이 아니라, nominal simulator 위에 correction layer를 얹는 방식이라는 뜻입니다.",
        [qa("어떤 경우에 ASAP를 바로 가져다 쓰기 어렵나요?", "stage 1 policy가 아직 너무 약하거나, simulator defect가 전역적이고 구조적으로 커서 local residual로 설명되지 않는 경우입니다.")],
      ),
    },
    {
      section: "takeaways",
      chapter: "Interpretation",
      title: "Summary and Interpretation",
      subtitle: "The paper is most convincing when read as simulator correction for already-competent agile motion tracking.",
      visual: {
        type: "cards",
        cols: 3,
        items: [
          ["Mechanism", "Real rollouts train a delta action model that alters simulator transitions before final PPO fine-tuning."],
          ["Evidence", "Replay quality, cross-simulator tracking, and real-world motion quality all improve in the same direction."],
          ["Practical value", "The gains survive on hard dynamic motions while deployment stays single-policy."],
        ],
      },
      points: [
        `ASAP is less about generating new motion and more about <strong>preserving existing agile motion across the final transfer boundary</strong>.`,
        `The strongest empirical pattern is consistent improvement from <strong>Table III</strong> to <strong>Table V</strong>, rather than a single isolated benchmark win.`,
      ],
      ...note(
        "이 논문을 한 문장으로 요약하면, 이미 꽤 잘 만들어진 agile motion-tracking policy가 마지막 transfer boundary에서 잃는 민첩성을 되찾기 위해 simulator를 먼저 고치고 policy를 다시 학습시키는 방법이라고 할 수 있습니다. 그리고 그 주장은 open-loop replay, closed-loop sim-to-sim, real-world result, 그리고 ablation까지 같은 방향의 증거로 뒷받침됩니다. 그래서 ASAP의 contribution은 motion generation이 아니라 simulator alignment에 있습니다.",
        "발표를 마무리할 때는 new motion source가 아니라 transfer-specific correction이라는 점, 그리고 runtime complexity를 늘리지 않고 real-world quality를 올렸다는 점을 함께 강조하는 것이 좋습니다. 연구실 관점에서는 residual simulator alignment가 향후 더 넓은 embodiment나 task family로 확장될 수 있는지가 다음 질문이 됩니다.",
        [qa("이 논문의 가장 강한 증거 하나만 고르라면 무엇인가요?", "실제 로봇 OOD motion에서도 개선이 유지된다는 Table V와 Figure 8 조합이 가장 강합니다.")],
      ),
    },
    {
      section: "takeaways",
      chapter: "Resources",
      title: "Resources",
      subtitle: "Paper, project page, code, and the central question to keep from the talk.",
      points: [
        `<strong>Paper.</strong> <a href="${PAPER_URL}" target="_blank" rel="noreferrer">${PAPER_URL}</a>`,
        `<strong>Project.</strong> <a href="${PROJECT_URL}" target="_blank" rel="noreferrer">${PROJECT_URL}</a>`,
        `<strong>Code.</strong> <a href="${CODE_URL}" target="_blank" rel="noreferrer">${CODE_URL}</a>`,
      ],
      visual: {
        type: "quote",
        text: "If stage-1 imitation is already good, improving simulator physics can be a more efficient path to better deployment than redesigning the controller.",
      },
      ...note(
        "링크는 마지막에 정리해 두었습니다. 발표에서 남겨야 할 질문은 단순합니다. stage 1 imitation이 이미 충분히 좋다면, 다음 성능 향상은 policy architecture를 또 바꾸는 데서 오느냐, 아니면 simulator가 가르치는 physics를 실제에 더 가깝게 만드는 데서 오느냐입니다. ASAP은 그 두 번째 답을 가장 직접적으로 밀어붙이는 논문입니다.",
        "project page에는 실제 영상이 정리돼 있고, code repository에는 simulator alignment 구현 세부가 들어 있습니다. 발표 뒤에 method를 더 파고들 때는 Figure 2, Table III, Table IV, Table V 순서로 다시 보는 것이 가장 효율적입니다.",
        [qa("후속으로 가장 먼저 검토할 만한 확장 방향은 무엇인가요?", "더 넓은 motion set과 더 많은 embodiment에서 iterative rollout refresh까지 포함한 scaling study를 보는 것이 다음 단계로 자연스럽습니다.")],
      ),
    },
  ],
};
