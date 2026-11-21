/** Verified figures. The infographic and the portfolio page both read these values. */
export const turpin = {
  drop: 'up to 36 points',
  setup: 'GPT-3.5, zero-shot chain-of-thought, Suggested Answer cue, worst tested condition',
  reviewed: '426',
  mentioned: '1',
} as const

export const zech = {
  model: 'Combined-hospital model (Mount Sinai + NIH)',
  setting: 'Internal evaluation of that model versus an external test at Indiana University',
  internalAuc: '0.931',
  externalAuc: '0.815',
  nih: '99.95%',
  sinai: '99.98%',
  comparisons: '3 of 5',
} as const

export const goldenGate = {
  multiple: '10×',
  model: 'Claude 3 Sonnet',
} as const

export const explanationParagraphs = [
  'Explainable Artificial Intelligence (XAI) refers to approaches that help people understand, investigate, and evaluate AI model behavior. It is especially difficult for large language models such as GPT, Claude, Gemini, and Llama, because an output emerges from distributed representations and from interactions across the network. Regulatory duties add a separate constraint, and they vary by use and jurisdiction. The EU AI Act requires high-risk systems to be transparent enough for deployers to interpret an output, and it gives some affected people a right to an explanation of certain decisions. That right concerns the role of the system in the decision, not a complete view of the model’s internal reasoning. Attention visualization, feature attribution, counterfactual testing, and mechanistic interpretability each supply a different kind of evidence, and each has limits. A fluent explanation can still omit a factor that influenced the answer, so it is a claim to evaluate rather than a definitive account of how the model reasoned.',
  'Explainability is more useful beside validation, performance metrics, and governance. Accuracy, precision, recall, F1, calibration, robustness, and external validation ask whether the model did the task. Faithfulness, stability, sanity checks, and tests with users ask whether an explanation can be relied on. Documentation, safeguards, monitoring, and human oversight ask whether the surrounding system is appropriate. I split the infographic on that distinction. Page 1 shows why an explanation alone is weak evidence, using a featured chain-of-thought study and a smaller mechanistic example. Page 2 states the three checks and marks each metric, test, and industry example with the check it informs. The checks can overlap in a deployment, and they stay separate. They are not combined into one score.',
] as const

export const findings = [
  {
    title: 'A fluent explanation can hide the cue.',
    text: 'In the worst tested condition, a Suggested Answer cue cut GPT-3.5 zero-shot chain-of-thought accuracy by up to 36 points. Only 1 of 426 reviewed explanations mentioned it.',
  },
  {
    title: 'A high internal score can shrink outside the hospital.',
    text: 'A combined-hospital pneumonia CNN scored ROC-AUC 0.931 internally and 0.815 at Indiana University. It is a medical-imaging model, not an LLM.',
  },
  {
    title: 'Trust is three checks, not one score.',
    text: 'Task performance, explanation faithfulness, and system safeguards answer different questions. Passing one does not establish the others.',
  },
] as const

export const classificationRationale = [
  'I classified the six techniques on four separate dimensions: scope, model access, evidence type, and maturity or limitation. Attention visualization is often local, reads internal attention patterns, and does not by itself prove a cause. LIME is a local black-box surrogate of behavior, with the limits of an approximation. SHAP assigns a contribution to one prediction; those local values can be aggregated, and some implementations are black-box while others need the model. Counterfactual testing is usually local and behavioral: it changes an input and watches the output. Mechanistic interpretability can investigate a local feature or a broader circuit, needs internal access, and can include a causal intervention. Representation probing asks whether information is decodable from activations across examples. A method can carry more than one of these values. I did not force them into one ladder.',
  'Intrinsic interpretability would mean the model was built so that its form is the explanation. These methods are used here to investigate existing models. None of the six is itself an intrinsically interpretable model architecture. I do not treat every possible use of them as post-hoc, because that word describes when an explanation is applied, not a single box every technique must occupy. Attention visualization was the difficult case. It needs internal access, so it is not a black-box behavioral test, but reading attention patterns does not establish that those patterns caused the output. Representation probing is also different from a prompt perturbation. Probing trains a classifier on activations. Changing a word and watching the output tests behavior. Decodability is not the same as causal use.',
  'I used a second set of labels for the four organizations, based on what each publication provides. DOC is documentation. EVAL is structured evaluation. MECH is mechanistic research. TOOL is released research tooling. SAFEGUARD is safety filtering or another protective control, and not every safeguard is a runtime filter. The GPT-4o System Card carries more than one of these labels. None of them is a complete explanation of a model’s decisions.',
  'Page 2 keeps the same separation at the level of a deployment. Task metrics and the external-validation case inform the performance check. Explanation tests, the chain-of-thought study, and the feature studies inform the faithfulness check. Documentation, safeguards, and governance inform the system check. A result on one check does not establish the others, and the numbered markers are an organizing device rather than a score.',
] as const

export const reflection = [
  'Before this assignment, I treated a fluent explanation as a reasonable account of how a model reached its answer. The Suggested Answer study changed that. A cue placed in the prompt moved the model’s answers, and the written explanation usually never named the cue. Chain-of-thought text is generated. It can sound complete and still leave out a factor that influenced the prediction, so I now read it as a claim to test rather than as a trace of the computation.',
  'Checking the papers taught me the same habit about my own notes. I first tied the accuracy drop to the wrong bias condition, and a pair of pneumonia scores I had planned to chart appeared in press coverage rather than in the study I could verify. Both changed once I used the primary sources. I also had to separate representation probing, which asks whether information is decodable from activations, from a prompt change that only watches the output.',
  'The chest-radiograph study separated a second idea I had been folding into a single accuracy number. Doing well on the data used for evaluation did not establish performance at a new hospital, and the images carried site information a network could pick up. In applied work such as document intelligence and language-model systems, I would keep three checks apart before trusting a deployment: task metrics on data from outside the development setting, a faithfulness test for any explanation shown to a user, and documented safeguards, monitoring, and human review. I would not average them into one trust score.',
] as const

export const caseStudies = [
  {
    id: 'T1',
    title: 'When an explanation omits the cue',
    authors: 'Turpin, Michael, Perez, and Bowman (2023)',
    text: 'The study tested GPT-3.5 (text-davinci-003) and Claude 1.0 on constructed multiple-choice tasks. The featured result is the worst Suggested Answer condition for GPT-3.5 zero-shot chain-of-thought: accuracy fell by up to 36 points. Of 426 reviewed explanations supporting biased predictions, only 1 explicitly mentioned the bias. The authors call the test necessary but not sufficient for faithfulness, and the omission count is a reviewed sample rather than a rate for every model.',
  },
  {
    id: 'Z1',
    title: 'When internal accuracy does not travel',
    authors: 'Zech, Badgeley, Liu, Costa, Titano, and Oermann (2018)',
    text: 'This is a pneumonia CNN study, not an LLM study, and the figures used here come from the abstract. For the combined Mount Sinai and NIH model, internal ROC-AUC was 0.931 and external ROC-AUC at Indiana University was 0.815. Internal performance was higher in 3 of 5 natural comparisons. Separate CNNs trained on these X-rays identified the hospital system for 99.95% of NIH images and 99.98% of Mount Sinai images. That shows site information was available in the images. It does not show that site information was the sole cause of the generalization gap.',
  },
  {
    id: 'A1',
    title: 'When one internal feature can be turned up',
    authors: 'Templeton, Conerly, and colleagues (2024)',
    text: 'Anthropic researchers identified a Claude 3 Sonnet feature that fires on Golden Gate Bridge references, including in other languages and on related images. Clamping that feature to 10× its maximum activation led the model to describe itself as the bridge. The authors call the feature set an incomplete description of the model’s internal representations, and they describe the safety implications as very preliminary.',
  },
] as const

export const limitations = [
  'Turpin and colleagues tested GPT-3.5 (text-davinci-003) and Claude 1.0 on constructed multiple-choice tasks. The 36-point figure is the worst Suggested Answer condition, and 1 of 426 is a reviewed sample rather than a rate for current models.',
  'The Zech figures used here come from the paper’s abstract. The example is a pneumonia CNN, so it is cross-domain evidence for an LLM discussion. Separate networks could identify the hospital system, which shows that site information was available. It does not establish a single cause, and two of five natural comparisons showed no significant difference.',
  'The Golden Gate intervention shows one feature’s effect on outputs. It is developer-run research, and the authors call the features an incomplete description of the model.',
  'The industry examples are drawn from the organizations’ own publications. This portfolio does not independently reproduce their results.',
  'Whether attention weights can serve as explanations is debated. Jain and Wallace (2019) argue that attention is often uncorrelated with other importance measures. That is one side of the debate, not a settled result.',
] as const
