export type A44Source = {
  id: string
  text: string
  href: string
  linkLabel: string
}

/** Curated sources cited on the infographic or the portfolio page. [A2] is omitted: its full paper was not opened. [R1] is limited to Articles 13 and 86 of the official text. */
export const a44Sources: A44Source[] = [
  {
    id: 'T1',
    text: 'Turpin, M., Michael, J., Perez, E., & Bowman, S. R. (2023). Language models don’t always say what they think: Unfaithful explanations in chain-of-thought prompting. NeurIPS 36.',
    href: 'https://doi.org/10.48550/arXiv.2305.04388',
    linkLabel: 'https://doi.org/10.48550/arXiv.2305.04388',
  },
  {
    id: 'Z1',
    text: 'Zech, J. R., Badgeley, M. A., Liu, M., Costa, A. B., Titano, J. J., & Oermann, E. K. (2018). Variable generalization performance of a deep learning model to detect pneumonia in chest radiographs: A cross-sectional study. PLOS Medicine, 15(11), e1002683.',
    href: 'https://doi.org/10.1371/journal.pmed.1002683',
    linkLabel: 'https://doi.org/10.1371/journal.pmed.1002683',
  },
  {
    id: 'A1',
    text: 'Templeton, A., Conerly, T., et al. (2024, May 21). Scaling monosemanticity: Extracting interpretable features from Claude 3 Sonnet. Transformer Circuits Thread.',
    href: 'https://transformer-circuits.pub/2024/scaling-monosemanticity/',
    linkLabel: 'transformer-circuits.pub/2024/scaling-monosemanticity',
  },
  {
    id: 'O1',
    text: 'OpenAI. (2024, August 8). GPT-4o system card.',
    href: 'https://cdn.openai.com/gpt-4o-system-card.pdf',
    linkLabel: 'GPT-4o system card (PDF)',
  },
  {
    id: 'G1',
    text: 'Lieberum, T., et al. (2024). Gemma Scope: Open sparse autoencoders everywhere all at once on Gemma 2. BlackboxNLP 2024.',
    href: 'https://arxiv.org/abs/2408.05147',
    linkLabel: 'https://arxiv.org/abs/2408.05147',
  },
  {
    id: 'M1',
    text: 'Inan, H., et al. (2023). Llama Guard: LLM-based input-output safeguard for human-AI conversations.',
    href: 'https://arxiv.org/abs/2312.06674',
    linkLabel: 'https://arxiv.org/abs/2312.06674',
  },
  {
    id: 'X1',
    text: 'Jain, S., & Wallace, B. C. (2019). Attention is not explanation. NAACL-HLT 2019, 3543–3556.',
    href: 'https://doi.org/10.18653/v1/N19-1357',
    linkLabel: 'https://doi.org/10.18653/v1/N19-1357',
  },
  {
    id: 'X2',
    text: 'Ribeiro, M. T., Singh, S., & Guestrin, C. (2016). “Why should I trust you?”: Explaining the predictions of any classifier. KDD 2016.',
    href: 'https://doi.org/10.1145/2939672.2939778',
    linkLabel: 'https://doi.org/10.1145/2939672.2939778',
  },
  {
    id: 'X3',
    text: 'Lundberg, S. M., & Lee, S.-I. (2017). A unified approach to interpreting model predictions. NeurIPS 30.',
    href: 'https://arxiv.org/abs/1705.07874',
    linkLabel: 'https://arxiv.org/abs/1705.07874',
  },
  {
    id: 'X4',
    text: 'Slack, D., Hilgard, S., Jia, E., Singh, S., & Lakkaraju, H. (2020). Fooling LIME and SHAP: Adversarial attacks on post hoc explanation methods. AIES 2020.',
    href: 'https://doi.org/10.1145/3375627.3375830',
    linkLabel: 'https://doi.org/10.1145/3375627.3375830',
  },
  {
    id: 'X5',
    text: 'Wachter, S., Mittelstadt, B., & Russell, C. (2018). Counterfactual explanations without opening the black box: Automated decisions and the GDPR. Harvard Journal of Law & Technology, 31(2).',
    href: 'https://arxiv.org/abs/1711.00399',
    linkLabel: 'https://arxiv.org/abs/1711.00399',
  },
  {
    id: 'X6',
    text: 'Belinkov, Y. (2022). Probing classifiers: Promises, shortcomings, and advances. Computational Linguistics, 48(1), 207–219.',
    href: 'https://doi.org/10.1162/coli_a_00422',
    linkLabel: 'https://doi.org/10.1162/coli_a_00422',
  },
  {
    id: 'X7',
    text: 'Adebayo, J., Gilmer, J., Muelly, M., Goodfellow, I., Hardt, M., & Kim, B. (2018). Sanity checks for saliency maps. NeurIPS 31.',
    href: 'https://arxiv.org/abs/1810.03292',
    linkLabel: 'https://arxiv.org/abs/1810.03292',
  },
  {
    id: 'V1',
    text: 'Guo, C., Pleiss, G., Sun, Y., & Weinberger, K. Q. (2017). On calibration of modern neural networks. ICML 2017, PMLR 70:1321–1330.',
    href: 'https://proceedings.mlr.press/v70/guo17a.html',
    linkLabel: 'proceedings.mlr.press/v70/guo17a',
  },
  {
    id: 'V2',
    text: 'Doshi-Velez, F., & Kim, B. (2017). Towards a rigorous science of interpretable machine learning.',
    href: 'https://arxiv.org/abs/1702.08608',
    linkLabel: 'https://arxiv.org/abs/1702.08608',
  },
  {
    id: 'V3',
    text: 'scikit-learn developers. (n.d.). precision_recall_fscore_support and f1_score. scikit-learn API documentation. Retrieved November 20, 2026.',
    href: 'https://scikit-learn.org/stable/modules/generated/sklearn.metrics.precision_recall_fscore_support.html',
    linkLabel: 'precision_recall_fscore_support',
  },
  {
    id: 'N1',
    text: 'Phillips, P. J., et al. (2021). Four principles of explainable artificial intelligence (NISTIR 8312). NIST.',
    href: 'https://doi.org/10.6028/NIST.IR.8312',
    linkLabel: 'https://doi.org/10.6028/NIST.IR.8312',
  },
  {
    id: 'R1',
    text: 'European Parliament and Council of the European Union. (2024). Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), Articles 13 and 86. Official Journal of the European Union.',
    href: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj',
    linkLabel: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj',
  },
]
