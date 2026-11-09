"""Build the Assignment 2.4 PowerPoint from the author's Playground screenshots."""

from pathlib import Path

from PIL import Image
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_CONNECTOR, MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Emu, Inches, Pt

ROOT = Path(__file__).resolve().parents[2]
SHOTS = ROOT / "public" / "aiml-501" / "neural-networks"
OUT = ROOT / "public" / "downloads" / "aiml-501-neural-networks.pptx"
CROP = SHOTS / "weights-crop.png"

NAVY = RGBColor(0x14, 0x23, 0x3A)
BLUE = RGBColor(0x1D, 0x4E, 0x89)
ORANGE = RGBColor(0xC4, 0x5C, 0x26)
INK = RGBColor(0x14, 0x23, 0x3A)
MUTED = RGBColor(0x3A, 0x4C, 0x63)
PAPER = RGBColor(0xF7, 0xF4, 0xEF)
WHITE = RGBColor(0xFF, 0xFC, 0xF8)
LINE = RGBColor(0xD5, 0xCE, 0xC2)
PALE_BLUE = RGBColor(0xE7, 0xF0, 0xFA)
PALE_ORANGE = RGBColor(0xFB, 0xF1, 0xE8)
PLAY_BLUE = RGBColor(0x2F, 0x6F, 0xED)
PLAY_ORANGE = RGBColor(0xE8, 0x6A, 0x17)

W = 13.333
H = 7.5


def set_run(run, size, color, bold=False):
    run.font.name = "Calibri"
    run.font.size = Pt(size)
    run.font.color.rgb = color
    run.font.bold = bold


def add_text(slide, left, top, width, height, lines, size=16, color=INK, bold=False, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, space_after=2):
    shape = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(height))
    frame = shape.text_frame
    frame.word_wrap = True
    frame.auto_size = None
    frame.margin_left = Inches(0.04)
    frame.margin_right = Inches(0.04)
    frame.margin_top = Inches(0.02)
    frame.margin_bottom = Inches(0.02)
    try:
        frame._txBody.bodyPr.set("anchor", {MSO_ANCHOR.TOP: "t", MSO_ANCHOR.MIDDLE: "ctr", MSO_ANCHOR.BOTTOM: "b"}[anchor])
    except Exception:
        pass
    for index, line in enumerate(lines):
        paragraph = frame.paragraphs[0] if index == 0 else frame.add_paragraph()
        paragraph.alignment = align
        paragraph.space_after = Pt(space_after)
        if isinstance(line, tuple):
            content, line_size, line_bold, line_color = line
        else:
            content, line_size, line_bold, line_color = line, size, bold, color
        run = paragraph.add_run()
        run.text = content
        set_run(run, line_size, line_color, line_bold)
    return shape


def rect(slide, left, top, width, height, fill, line=None):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill
    if line is None:
        shape.line.fill.background()
    else:
        shape.line.color.rgb = line
        shape.line.width = Pt(1)
    return shape


def blank(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    rect(slide, 0, 0, W, H, PAPER)
    rect(slide, 0, 0, W, 0.08, BLUE)
    return slide


def footer(slide, number):
    add_text(slide, 0.4, 7.18, 9.5, 0.26, ["AIML-501 · Assignment 2.4 · Sriharshitha Ayyalasomayajula"], 11, MUTED)
    add_text(slide, 11.4, 7.18, 1.5, 0.26, [f"{number} / 11"], 11, MUTED, align=PP_ALIGN.RIGHT)


def heading(slide, title, subtitle=None):
    add_text(slide, 0.4, 0.22, 12.4, 0.46, [title], 28, NAVY, True)
    if subtitle:
        add_text(slide, 0.4, 0.68, 12.4, 0.36, [subtitle], 15, MUTED)


def arrow(connector):
    line = connector.line._get_or_add_ln()
    end = line.makeelement(qn("a:tailEnd"))
    end.set("type", "triangle")
    end.set("w", "med")
    end.set("len", "med")
    line.append(end)


def link(slide, x1, y1, x2, y2, color, width=1.25):
    shape = slide.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, Inches(x1), Inches(y1), Inches(x2), Inches(y2))
    shape.line.color.rgb = color
    shape.line.width = Pt(width)
    return shape


def neuron(slide, cx, cy, label, fill=WHITE, line_color=BLUE):
    radius = 0.2
    shape = slide.shapes.add_shape(
        MSO_SHAPE.OVAL,
        Inches(cx - radius),
        Inches(cy - radius),
        Inches(radius * 2),
        Inches(radius * 2),
    )
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill
    shape.line.color.rgb = line_color
    shape.line.width = Pt(1.5)
    frame = shape.text_frame
    frame.word_wrap = False
    frame.margin_left = Emu(0)
    frame.margin_right = Emu(0)
    frame.margin_top = Emu(0)
    frame.margin_bottom = Emu(0)
    frame._txBody.bodyPr.set("anchor", "ctr")
    paragraph = frame.paragraphs[0]
    paragraph.alignment = PP_ALIGN.CENTER
    run = paragraph.add_run()
    run.text = label
    set_run(run, 10, NAVY, True)
    return shape


def picture(slide, path, left, top, max_w, max_h):
    with Image.open(path) as image:
        aspect = image.width / image.height
    width = max_w
    height = width / aspect
    if height > max_h:
        height = max_h
        width = height * aspect
    x = left + (max_w - width) / 2
    slide.shapes.add_picture(str(path), Inches(x), Inches(top), Inches(width), Inches(height))
    return x, top, width, height


def make_weight_crop():
    source = SHOTS / "exp2b-xor.png"
    with Image.open(source) as image:
        # Hidden layers and weight annotations, stopping before the output plot.
        crop = image.crop((360, 108, 970, 650))
        crop.save(CROP)


def slide_title(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    rect(slide, 0, 0, W, H, NAVY)
    rect(slide, 0, 0, 0.18, H, ORANGE)
    add_text(
        slide,
        0.7,
        1.35,
        8.3,
        2.1,
        ["Inside a Neural Network: Components, Data Flow, and TensorFlow Playground Experiments"],
        32,
        WHITE,
        True,
    )
    add_text(
        slide,
        0.7,
        3.6,
        8.1,
        0.8,
        ["Visualizing six neural network components through three comparative experiments."],
        18,
        RGBColor(0xD7, 0xE3, 0xF4),
    )
    add_text(
        slide,
        0.7,
        5.15,
        7.4,
        1.5,
        [
            "Sriharshitha Ayyalasomayajula",
            "AIML-501 Model Development  ·  Assignment 2.4",
            "Indiana Wesleyan University  ·  Fall 2026",
        ],
        16,
        WHITE,
    )
    add_text(slide, 11.4, 7.05, 1.5, 0.26, ["1 / 11"], 12, RGBColor(0xD7, 0xE3, 0xF4), align=PP_ALIGN.RIGHT)
    # Subtle network motif
    columns = [10.15, 11.15, 12.15]
    rows = [[2.2, 3.3, 4.4], [1.9, 2.85, 3.8, 4.75], [3.3]]
    centers = []
    for x, ys in zip(columns, rows):
        column = []
        for y in ys:
            neuron(slide, x, y, "", fill=NAVY, line_color=RGBColor(0x8F, 0xB4, 0xE0))
            column.append((x, y))
        centers.append(column)
    for left_col, right_col, color in (
        (centers[0], centers[1], PLAY_BLUE),
        (centers[1], centers[2], PLAY_ORANGE),
    ):
        for x1, y1 in left_col:
            for x2, y2 in right_col:
                link(slide, x1 + 0.18, y1, x2 - 0.18, y2, color, 1.25)


def slide_flow(prs):
    slide = blank(prs)
    heading(slide, "How Data Flows Through a Neural Network", "Experiment 2: two inputs, two hidden layers of four neurons, and one output.")
    input_ys = [2.35, 3.85]
    hidden_ys = [1.7, 2.55, 3.4, 4.25]
    columns = [
        (1.15, input_ys, ["X₁", "X₂"], PALE_BLUE),
        (3.05, hidden_ys, ["", "", "", ""], WHITE),
        (4.95, hidden_ys, ["", "", "", ""], WHITE),
        (6.85, [3.05], [""], PALE_ORANGE),
    ]
    points = []
    for x, ys, labels, fill in columns:
        column = []
        for y, label in zip(ys, labels):
            neuron(slide, x, y, label, fill=fill)
            column.append((x, y))
        points.append(column)
    for left_col, right_col in zip(points, points[1:]):
        for x1, y1 in left_col:
            for x2, y2 in right_col:
                link(slide, x1 + 0.2, y1, x2 - 0.2, y2, RGBColor(0xC5, 0xD0, 0xDC), 0.75)
    # One positive and one negative weight, called out rather than coloring every edge.
    link(slide, points[0][0][0] + 0.2, points[0][0][1], points[1][0][0] - 0.2, points[1][0][1], PLAY_BLUE, 2.25)
    link(slide, points[0][1][0] + 0.2, points[0][1][1], points[1][2][0] - 0.2, points[1][2][1], PLAY_ORANGE, 2.25)
    add_text(slide, 1.55, 1.95, 1.15, 0.28, ["weight"], 11, PLAY_BLUE, True)
    labels = [
        (0.45, "Input layer"),
        (2.25, "Hidden layer 1"),
        (4.15, "Hidden layer 2"),
        (6.2, "Output"),
    ]
    for x, label in labels:
        add_text(slide, x, 4.62, 1.7, 0.42, [label], 12, NAVY, True, align=PP_ALIGN.CENTER)
    add_text(slide, 6.15, 5.05, 1.5, 0.4, ["predicted class score"], 11, MUTED, align=PP_ALIGN.CENTER)
    rect(slide, 0.4, 5.45, 7.35, 1.55, WHITE, LINE)
    add_text(
        slide,
        0.55,
        5.55,
        7.05,
        1.35,
        [
            ("One neuron", 16, True, NAVY),
            ("a = f(Σ wᵢxᵢ + b)", 20, True, BLUE),
            ("Weighted inputs plus a bias, then an activation. Experiment 2B uses Tanh.", 13, False, MUTED),
            ("Blue connection: positive weight. Orange connection: negative weight.", 13, False, MUTED),
        ],
    )
    steps = [
        ("1  Forward propagation", "Computes the prediction from the current weights, biases, and activation."),
        ("2  Loss", "Measures the prediction error. Training loss is evaluated on training data; test loss is evaluated on held-out data. The two values may differ."),
        ("3  Backpropagation", "Computes the gradient of the loss for each trainable parameter."),
        ("4  Optimizer", "Updates parameters. w ← w − η(∂L/∂w). These runs used η = 0.03."),
    ]
    top = 1.12
    for index, (title, body) in enumerate(steps):
        y = top + index * 1.4
        rect(slide, 8.05, y, 4.85, 1.28, WHITE, LINE)
        rect(slide, 8.05, y, 0.08, 1.28, ORANGE if index == 3 else BLUE)
        add_text(slide, 8.25, y + 0.06, 4.5, 0.3, [title], 14, NAVY, True)
        add_text(slide, 8.25, y + 0.36, 4.5, 0.86, [body], 13, MUTED)
    footer(slide, 2)


def slide_groups(prs):
    slide = blank(prs)
    heading(slide, "Six Components: Structure, Transformation, and Learning")
    groups = [
        (0.4, BLUE, "Structure", ["Layers", "Neurons", "Weights"], "What the network is made of, and which connections can be trained."),
        (4.55, RGBColor(0x0F, 0x6B, 0x67), "Transformation", ["Activation functions"], "The nonlinear step that lets stacked layers represent curved regions."),
        (8.7, ORANGE, "Learning", ["Loss functions", "Optimization algorithms"], "How error is measured and how parameters change."),
    ]
    for left, color, title, items, note in groups:
        rect(slide, left, 1.25, 3.85, 3.15, WHITE, LINE)
        rect(slide, left, 1.25, 3.85, 0.1, color)
        add_text(slide, left + 0.2, 1.5, 3.45, 0.4, [title], 20, NAVY, True)
        add_text(slide, left + 0.2, 2.05, 3.45, 1.15, items, 16, INK)
        add_text(slide, left + 0.2, 3.3, 3.45, 0.9, [note], 13, MUTED)
    add_text(
        slide,
        0.4,
        4.6,
        12.4,
        0.55,
        ["The grouping separates a design choice, such as adding a layer, from a training measurement, such as test loss."],
        15,
        INK,
    )
    rect(slide, 0.4, 5.25, 12.5, 1.7, WHITE, LINE)
    add_text(
        slide,
        0.6,
        5.4,
        8.3,
        1.4,
        [
            ("Training writes back into the weights", 16, True, NAVY),
            ("Optimization does not replace the architecture. It changes the weights and biases inside it.", 14, False, MUTED),
            ("Weights → activation → loss → gradients → updated weights", 14, True, BLUE),
            ("An instructional grouping by primary role, not a mutually exclusive taxonomy.", 12, False, MUTED),
        ],
    )
    footer(slide, 3)


def slide_structure(prs):
    slide = blank(prs)
    heading(slide, "Structure: Layers, Neurons, and Weights")
    blocks = [
        ("Layers", "Ordered groups of units. The input layer receives features, hidden layers learn intermediate representations, and the output layer produces the prediction."),
        ("Neurons", "Each unit combines weighted inputs and a bias, then applies an activation. a = f(Σ wᵢxᵢ + b)."),
        ("Weights", "Trainable connection parameters. They set how strongly an input affects the next unit. A bias shifts the value before activation."),
    ]
    for index, (title, body) in enumerate(blocks):
        y = 1.2 + index * 1.45
        rect(slide, 0.4, y, 6.35, 1.32, WHITE, LINE)
        add_text(slide, 0.58, y + 0.08, 6.0, 0.32, [title], 16, NAVY, True)
        add_text(slide, 0.58, y + 0.42, 6.0, 0.8, [body], 14, INK)
    picture(slide, CROP, 6.95, 1.2, 5.95, 4.55)
    add_text(
        slide,
        6.95,
        5.85,
        5.95,
        1.15,
        ["TensorFlow Playground draws a positive weight in blue and a negative weight in orange. Line thickness shows the magnitude. Crop from the trained XOR Tanh run."],
        13,
        MUTED,
    )
    footer(slide, 4)


def slide_learning(prs):
    slide = blank(prs)
    heading(slide, "Activation, Loss, and Optimization", "These settings explain the runs. I did not compare loss functions or optimizers.")
    cards = [
        ("Activation functions", "A nonlinear activation lets a multilayer network represent a nonlinear relationship. Linear leaves each layer an affine map, so the stack stays affine. Tanh is the nonlinear choice in these runs. ReLU is another common choice, not used here."),
        ("Loss functions", "The loss quantifies prediction error and gives training an objective. Training loss is measured on the data used to update weights. Test loss is measured on held-out data. Common loss functions include mean squared error and cross-entropy; the appropriate choice depends on the task."),
        ("Optimization", "Backpropagation computes gradients. The optimizer applies them. w ← w − η(∂L/∂w). The learning rate η sets the step size. Every run here used learning rate 0.03 and batch size 10. Gradient descent is a common optimization algorithm. The learning rate controls the size of each parameter update."),
    ]
    for index, (title, body) in enumerate(cards):
        left = 0.4 + index * 4.25
        rect(slide, left, 1.25, 4.05, 4.35, WHITE, LINE)
        rect(slide, left, 1.25, 4.05, 0.1, BLUE if index < 2 else ORANGE)
        add_text(slide, left + 0.18, 1.48, 3.7, 0.55, [title], 18, NAVY, True)
        add_text(slide, left + 0.18, 2.08, 3.7, 3.3, [body], 13, INK)
    add_text(
        slide,
        0.4,
        5.8,
        12.5,
        1.15,
        ["Forward propagation makes the prediction. The loss scores it. Backpropagation finds the gradients. The optimizer changes the weights and biases. Holding the loss and optimizer fixed is what makes the architecture and activation comparisons readable."],
        15,
        INK,
    )
    footer(slide, 5)


def comparison(prs, number, title, question, left_image, right_image, left_lines, right_lines, interpretation, footnote=None):
    slide = blank(prs)
    heading(slide, title, question)
    picture(slide, left_image, 0.4, 1.15, 6.2, 3.15)
    picture(slide, right_image, 6.75, 1.15, 6.2, 3.15)
    rect(slide, 0.4, 4.4, 6.2, 1.35, WHITE, LINE)
    rect(slide, 6.75, 4.4, 6.2, 1.35, WHITE, LINE)
    add_text(slide, 0.52, 4.48, 5.95, 1.2, left_lines, 13, INK)
    add_text(slide, 6.87, 4.48, 5.95, 1.2, right_lines, 13, INK)
    add_text(slide, 0.4, 5.85, 12.5, 0.7, [interpretation], 14, INK)
    if footnote:
        add_text(slide, 0.4, 6.55, 12.5, 0.5, [footnote], 12, MUTED)
    footer(slide, number)


def slide_findings(prs):
    slide = blank(prs)
    heading(slide, "Summary: Key Insights and Why Visualization Matters")
    findings = [
        ("1", "Hidden layers increase representational capacity."),
        ("2", "With these raw inputs, a nonlinear activation was required to learn the nonlinear pattern."),
        ("3", "Capacity should be chosen for the problem and checked against a result, not assumed."),
        ("4", "Training loss alone does not establish generalization."),
        ("5", "The decision boundary shows underfitting that a single loss number can hide."),
        ("6", "One run is not a causal result. Repeat a comparison before claiming a cause."),
    ]
    for index, (number, text) in enumerate(findings):
        column = index % 2
        row = index // 2
        left = 0.4 + column * 6.45
        top = 1.25 + row * 1.45
        rect(slide, left, top, 6.2, 1.28, WHITE, LINE)
        add_text(slide, left + 0.15, top + 0.28, 0.5, 0.5, [number], 22, ORANGE, True)
        add_text(slide, left + 0.7, top + 0.28, 5.25, 0.75, [text], 16, INK)
    add_text(
        slide,
        0.4,
        5.58,
        12.5,
        1.48,
        ["Why visualization matters: TensorFlow Playground turns abstract network operations into visible evidence. Colored connections illustrate weights, individual neuron maps reveal intermediate representations, and the output plot shows the learned decision boundary. These views helped identify underfitting in Experiments 1A and 2A and interpret the train–test loss gap in Experiment 3. Visualization complements numerical evaluation rather than replacing it."],
        14,
        INK,
    )
    footer(slide, 9)


def slide_reflection(prs):
    slide = blank(prs)
    heading(slide, "Learning Reflection and Next Steps")
    rect(slide, 0.4, 1.2, 12.5, 5.75, WHITE, LINE)
    add_text(
        slide,
        0.6,
        1.35,
        12.1,
        5.45,
        [
            "I learned to keep the pieces apart. Layers and neurons set what the network can represent. Weights and biases are the values training changes. An activation such as Tanh is the nonlinear step. The loss scores the prediction, and the optimizer uses gradients from backpropagation to update the weights.",
            "The circle runs made hidden layers concrete. With no hidden layer, the boundary stayed straight and both losses stayed near one half. Two small Tanh layers bent the boundary and lowered the test loss. The XOR runs made the activation concrete. The linear network never separated the four corners. The Tanh network did.",
            "On the spiral data I read training loss and test loss together. The noise-free run had the lower training loss and the larger gap. The noise-25 run had a smaller gap. I do not take that as evidence that noise improves generalization. Each configuration was one run, on its own generated sample, and the initial weights may have differed.",
            "The difficult part was knowing what a loss number can support. I kept the learning rate and batch size fixed, checked the picture of the boundary, and wrote the limit next to the comparison. That is also how I want to select a model later: match the architecture to the pattern, change one thing at a time, and treat a single run as a single run. Building the presentation also tested my understanding. Weights were the hardest component to classify because they define connections within the network but are also the parameters updated during training.",
        ],
        14,
        INK,
        space_after=12,
    )
    footer(slide, 10)


def slide_references(prs):
    slide = blank(prs)
    heading(slide, "References")
    refs = [
        "Goodfellow, I., Bengio, Y., & Courville, A. (2016). Deep learning. MIT Press. https://www.deeplearningbook.org/",
        "Google. (n.d.). Neural networks. Machine Learning Crash Course. https://developers.google.com/machine-learning/crash-course/neural-networks",
        "Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986). Learning representations by back-propagating errors. Nature, 323(6088), 533–536. https://doi.org/10.1038/323533a0",
        "Smilkov, D., & Carter, S. (n.d.). TensorFlow Playground. https://playground.tensorflow.org/",
        "Smilkov, D., Carter, S., Sculley, D., Viégas, F. B., & Wattenberg, M. (2017). Direct-manipulation visualization of deep networks. arXiv. https://arxiv.org/abs/1708.03788",
    ]
    top = 1.2
    for index, text in enumerate(refs):
        add_text(slide, 0.45, top + index * 0.82, 12.4, 0.78, [text], 14, INK)
    add_text(
        slide,
        0.45,
        5.7,
        12.4,
        1.2,
        ["Experiment screenshots and reported results were collected by the author using TensorFlow Playground."],
        14,
        MUTED,
    )
    footer(slide, 11)


def build():
    make_weight_crop()
    prs = Presentation()
    prs.slide_width = Inches(W)
    prs.slide_height = Inches(H)
    prs.core_properties.title = "Inside a Neural Network: Components, Data Flow, and TensorFlow Playground Experiments"
    prs.core_properties.author = "Sriharshitha Ayyalasomayajula"
    prs.core_properties.subject = "AIML-501 Assignment 2.4"
    slide_title(prs)
    slide_flow(prs)
    slide_groups(prs)
    slide_structure(prs)
    slide_learning(prs)
    comparison(
        prs,
        6,
        "Experiment 1: Network Architecture",
        "How do hidden layers affect learning on the circle data?",
        SHOTS / "exp1a-circle.png",
        SHOTS / "exp1b-circle.png",
        [
            ("1A  ·  No hidden layers", 15, True, NAVY),
            ("Epoch 535. Training loss 0.486. Test loss 0.492.", 13, False, INK),
            ("A straight, linear decision boundary. The network underfit the circle.", 13, False, INK),
        ],
        [
            ("1B  ·  Two hidden layers, 2 neurons, Tanh", 15, True, NAVY),
            ("Epoch 528. Training loss 0.137. Test loss 0.202.", 13, False, INK),
            ("The boundary bends around the circle but does not fully enclose it; test loss remains higher than training loss.", 13, False, INK),
        ],
        "Adding hidden layers let the network represent a nonlinear region and reduced the observed test loss. This pair does not identify an ideal architecture.",
    )
    comparison(
        prs,
        7,
        "Experiment 2: Linear vs. Tanh Activation",
        "Why does a nonlinear activation matter on XOR? Both networks: 2 hidden layers, 4 neurons, learning rate 0.03, noise 0.",
        SHOTS / "exp2a-xor.png",
        SHOTS / "exp2b-xor.png",
        [
            ("2A  ·  Linear", 15, True, NAVY),
            ("Epoch 526. Training loss 0.491. Test loss 0.513.", 13, False, INK),
            ("The four XOR regions were not learned.", 13, False, INK),
        ],
        [
            ("2B  ·  Tanh", 15, True, NAVY),
            ("Epoch 536. Training loss 0.000. Test loss 0.001.", 13, False, INK),
            ("The display shows four separate XOR regions.", 13, False, INK),
        ],
        "Stacked linear maps stay affine. Tanh let this network represent the XOR pattern.",
        "The displayed training loss of 0.000 is the Playground rounding, not a claim that the loss is exactly zero.",
    )
    comparison(
        prs,
        8,
        "Experiment 3: Noise and Generalization",
        "What can training loss and test loss say about the spiral data? Shared setup: 3 hidden layers, 8 neurons, Tanh, learning rate 0.03.",
        SHOTS / "exp3a-spiral.png",
        SHOTS / "exp3b-spiral.png",
        [
            ("3A  ·  Noise 0", 15, True, NAVY),
            ("Epoch 1,017. Train 0.010. Test 0.073. Gap 0.063.", 13, False, INK),
            ("The boundary follows the spiral.", 13, False, INK),
        ],
        [
            ("3B  ·  Noise 25", 15, True, NAVY),
            ("Epoch 1,030. Train 0.034. Test 0.041. Gap 0.007.", 13, False, INK),
            ("The boundary still follows the spiral.", 13, False, INK),
        ],
        "Both runs learned a spiral-shaped region. The noise-25 run had the smaller observed gap. Read the training loss and the test loss together.",
        "The smaller gap cannot be attributed to noise: each setting was one run on its own sample. This does not show that noise improves generalization.",
    )
    slide_findings(prs)
    slide_reflection(prs)
    slide_references(prs)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    prs.save(OUT)
    print(f"slides={len(prs.slides)} path={OUT}")


if __name__ == "__main__":
    build()
