# Agency Dynamic (AD): The Conditions and Dynamics of Agency

*Written in Chinese by River. Translated into English by ChatGPT.*

## Introduction

When people make choices, they also face the consequences. But if someone has little room to choose, how should we understand her actions, responsibility and circumstances?

*The Piano*, *Fang Si-Chi’s First Love Paradise* and Marguerite Duras’s *The Lover* approach this question from different directions. *The Piano* draws my attention to how someone expresses desire, refuses arrangements made for her and tries to make choices part of her own life. *Fang Si-Chi’s First Love Paradise* forces me to ask what someone can actually choose within a profoundly unequal relationship. *The Lover* further presents the coexistence of constraint and initiative: being situated within structures does not mean that desire, judgement and action disappear entirely.

These three works cannot simply be treated as cases to be scored against one another. Together, however, they suggest that recognising someone as an acting subject does not mean that she has adequate conditions for action, still less that she should be responsible for harm inflicted by others.

The question therefore shifts from ‘Does someone have agency?’ to ‘What forms of agency can someone actually exercise within particular relationships and structures?’ I provisionally call this perspective Agency Dynamic (AD). It distinguishes the practical conditions for action, the formation of a direction of one’s own, and the allocation of responsibility and consequences.

The essay first introduces concepts and formal expressions, then returns to the three works. The equations clarify assumptions and organise relationships; they are not empirically validated calculating tools. Assessments of variable levels and directions of change in the cases are the author’s qualitative readings, not measurements of characters. Nor do they rank the characters’ worth or their responses to trauma.

This essay developed through sustained discussion with ChatGPT. The author posed the questions and participated in developing and revising the framework; ChatGPT served as a thinking partner in clarifying concepts, working through arguments and organising language. Specific concepts and textual materials still require separate attribution. Human–AI discussion is not itself evidence for a conclusion.

## Conceptual Framework

### Conditions for Action and Self-authorship

AD considers the exercise of agency through two dimensions:

- **Agency Capacity ($C_i(t)$):** the ability of subject $i$, at time $t$ and under given structural conditions, to translate intentions into practical action.
- **Self-authorship ($S_i(t)$):** the extent to which someone’s desires, value judgements and goals have undergone personal reflection and can be claimed as their own, rather than merely following unexamined external scripts.

Self-authorship here does not presuppose desires wholly independent of social influences, nor require someone always to articulate a clear direction. Both capacity and self-authorship may vary with time, relationships and domains of action.

For discussion, the following ranges are provisionally stipulated:

$$
C_i(t),S_i(t)\in[0,1].
$$

These intervals are idealised scales, not established measurement methods. Here, $S$ differs in meaning from the self-state $S_t$ in SSTM; the two frameworks’ symbols are not interchangeable.

If $A_i$ denotes ‘Effective Agency’ as defined in this essay, its general form can be written as:

$$
A_i(t)=F\bigl(C_i(t),S_i(t)\bigr).
$$

One candidate expression is:

$$
A_i(t)=C_i(t)^\alpha S_i(t)^\beta,
\qquad \alpha,\beta>0.
$$

This multiplicative form emphasises the joint importance of both dimensions. As $C\to0$, $A$ approaches zero even when one’s direction is clear: knowing that one wants to leave, but lacking the conditions to do so. As $S\to0$, the indicator also approaches zero despite abundant resources: being able to act, but struggling to organise action around a direction one can claim as one’s own.

These properties follow from the chosen functional form, not an empirical law. ‘Effective Agency’ is a restricted concept here, not equivalent to all capacity for action, a person’s standing as a subject or their worth. Lower $S$ does not mean someone has no wishes, or that those wishes deserve less respect. Whether multiplication is appropriate, how weights should be set and how the dimensions can be distinguished remain open questions.

### Components of Agency Capacity

Capacity can be represented as a function of several conditions:

$$
C_i=f(W_i,K_i,N_i,I_i,P_i,Q_i,X_i).
$$

- $W_i$: material resources, such as money, housing and assets.
- $K_i$: knowledge and capabilities, including education, occupational skills and knowledge of relevant rules.
- $N_i$: support networks, including family, friends and professional relationships.
- $I_i$: information about opportunities, possibilities and risks.
- $P_i$: relative power within a particular relationship.
- $Q_i$: exit capacity—the conditions for refusing, leaving or continuing to live after failure.
- $X_i$: institutional and environmental conditions, such as welfare, social norms and institutional protection.

These factors may overlap and interact, and should not simply be added together. The action under discussion must also be specified: someone may be able to continue working while lacking the conditions to refuse a demand or leave a relationship.

### The Dynamics of Agency Capacity

For this discussion, the subject index $i$ is omitted. Let $E$ denote available input, $M(C,X)$ the input needed to maintain the current situation, and $D(C,X)$ the rate of capacity depletion. Here, $M$ denotes maintenance cost, unlike interpretive multiplicity in SSTM.

Define the input available for expanding capacity as:

$$
E_g=[E-M(C,X)]_+,
\qquad [u]_+:=\max(u,0).
$$

With $\eta(C,X)$ denoting the efficiency of converting input into additional capacity, a candidate dynamic relationship is:

$$
\dot C=G(C;E,X)
:=\eta(C,X)[E-M(C,X)]_+-D(C,X).
$$

Assume $\eta\geq0$ and $D\geq0$. Here, $\dot C=dC/dt$ is the rate of capacity change over time. Terms must use consistent time scales and units: conversion and depletion both represent capacity change per unit time.

The expression describes growth input being converted into additional capacity at a given efficiency, with depletion then subtracted. Illness, violence, unemployment, debt or care burdens may affect input, maintenance cost, conversion efficiency and depletion through different pathways; they should not all be assigned to one term without distinction.

Under certain conditions, one may hypothesise:

$$
\frac{\partial\eta}{\partial C}>0.
$$

Existing capacity may then improve the conversion efficiency of the same input, offering one mechanism for cumulative advantage. This alone does not guarantee net growth: maintenance cost and depletion may also change with $C$.

These relationships are local descriptions within the interval. A complete dynamic model would also require behaviour at $C=0$ and $C=1$ to be specified so that trajectories remain within $[0,1]$. The dynamics of $S$ require the same consideration.

### Capacity Traps

‘Agency Trap’ refers here specifically to difficulty accumulating capacity. It does not mean that people in such circumstances lack thought, desire or standing as acting subjects.

Two situations can be distinguished:

**First: available input cannot cover maintenance cost.**

When $E\leq M(C,X)$, $E_g=0$, giving:

$$
\dot C=-D(C,X)\leq0.
$$

Available input leaves no surplus for growth. If depletion is positive, capacity continues to fall.

**Second: a growth surplus exists, but cannot offset depletion.**

When $E>M(C,X)$, but:

$$
\eta(C,X)[E-M(C,X)]<D(C,X),
$$

we still have $\dot C<0$. There is room to attempt change, but these inputs cannot offset the depletion imposed by circumstances.

### Critical Points and Escape Thresholds

In the simplified case of fixed $E$ and $X$, suppose there is an interior critical point $C_c$ satisfying:

$$
G(C_c;E,X)=0,
$$

or:

$$
\eta(C_c,X)[E-M(C_c,X)]_+=D(C_c,X),
$$

At this point, capacity growth and depletion balance.

To call it an ‘Agency Escape Threshold’ requires an additional directional condition: near $C_c$, $G<0$ below the point and $G>0$ above it. Capacity then tends to decline below the threshold and enters a growth region above it. This unstable dividing point differs from a stable low-level state.

The equations do not guarantee that a threshold exists or is unique. There may be several critical points, or no net growth anywhere. Discussing a stable low-level point $C_L$ requires separate conditions: growth towards it from below and decline towards it from above. The existence of an escape threshold does not establish that $C_L$ exists.

### How External Support Changes the Threshold

Let $B(X,t)\geq0$ denote the rate of capacity increase directly contributed by external support—for example, gains after support resources have been converted into conditions for action. Support already included in $E$, $X$ or $M$ should not be counted again in $B$.

The dynamic relationship becomes:

$$
\dot C=G(C;E,X)+B(X,t).
$$

Consider a simplified case with a fixed environment and a temporarily constant level of support, treating $B$ as a parameter. The threshold satisfies:

$$
G(C_c;E,X)+B=0.
$$

If $G$ is differentiable at that point, $\partial G/\partial C>0$, and support does not simultaneously change other parameters, implicit differentiation gives:

$$
\frac{dC_c}{dB}
=-\frac{1}{\partial G/\partial C}<0.
$$

Under these conditions, greater support lowers the local escape threshold. This expresses a possibility worth considering: assistance need not make choices on someone’s behalf; it may improve the conditions under which they can begin accumulating capacity.

If support varies over time or simultaneously changes maintenance cost and depletion, the threshold may move, disappear or cease to be describable as a static dividing point. Receiving short-term support does not guarantee continued growth once it ends.

### Self-authorship and Its Dynamics

Self-authorship $S$ concerns how someone reflects on, understands and claims their desires and goals. It can be summarised as:

$$
S=s(L,V,R_f,D_s).
$$

- $L$: self-understanding.
- $V$: autonomy in value judgement.
- $R_f$: reflective capacity.
- $D_s$: room to examine existing social scripts.

Distance from social scripts does not mean that greater detachment always brings greater autonomy. Actively embracing a traditional role may follow substantial reflection; rejecting tradition does not automatically establish a direction of one’s own.

A candidate dynamic expression is:

$$
\dot S=H(S,C,Z)-J.
$$

$Z$ represents conditions that may encourage reflection and the reorganisation of experience, such as reading, creative work, encounters with unfamiliar experiences and changing relationships. $J$ represents the rate of pressure sustaining unexamined scripts within judgement. Such experiences need not have positive effects; the specific meanings and effects of $H$ and $J$ require contextual explanation.

Nor must the relationship between capacity and self-authorship always be positive. Safety, education and independence may provide room for reflection; additional resources may also bring identity maintenance, vested interests or fear of losing one’s position. These are possible mechanisms, not a conclusion that more resources necessarily weaken autonomy.

To illustrate only a possible rise and subsequent fall in $S$ as $C$ changes within a particular context, one could write:

$$
S(C)=aC-bC^2+\varepsilon,\qquad a,b>0.
$$

Here, $\varepsilon$ provisionally denotes a fixed offset. The curve turns at $C^*=a/(2b)$, but shows a complete inverted U only if that point lies within the interval under discussion. Parameters must also be restricted to keep $S(C)\in[0,1]$. This illustrative relationship is not derived from the $\dot S$ equation and cannot directly serve as a causal law.

## Case Analysis

The analysis preserves a distinction between three dimensions:

$$
\text{Agency}\neq\text{Responsibility}\neq\text{Consequence}.
$$

They cannot simply be equated or inferred from one another; this does not mean that they are unrelated. Someone with severely limited room for action may bear enormous consequences, but those consequences do not establish greater responsibility.

### Ada: Translating a Direction of Her Own into Action

This essay reads Ada in *The Piano* as someone striving to express and enact a direction of her own. Her marriage, movement and social position are constrained; she is not an unconstrained actor. Her capacity $C$ must therefore be understood within particular relationships, rather than presumed sufficient.

The piano, sign language, bodily expression, refusal and desire provide different means of self-expression. This essay uses relatively high $S$ to describe her commitment to what she cherishes. Silence does not mean an absence of judgement or agency.

On this reading, an important development is her attempt to use limited $C$ to translate her direction into action. With $A=C^\alpha S^\beta$, if $S>0$ remains constant while $C$ increases, $A$ also increases. If both change, they must be analysed together rather than through one factor alone.

Her actions can be understood as claiming a direction for her life. But acknowledging those actions as hers neither makes every choice morally right nor makes her responsible for coercion or violence inflicted by others.

**She expresses desire, makes choices and attempts to act, participating in the shaping of her life under constraints.**

### Fang Si-Chi: Action Does Not Imply Equal Responsibility

*Fang Si-Chi’s First Love Paradise* reminds us that recognising a victim’s agency cannot be converted into a demand that she bear responsibility for the harm.

Fang Si-Chi feels, understands and judges, and tries to find language for her experience. These are activities of a subject, but they do not establish responsibility for the abuse she suffers. A perpetrator’s responsibility must be assessed through their actions, power and the harm caused; it cannot be cancelled by the victim’s responses.

This essay describes her circumstances through severely restricted $C_{\text{Fang Si-Chi}}$. The concern is information, power and exit conditions within a particular relationship, not a denial of her capabilities elsewhere in life.

Age, teacher–student power, differences in experience and the surrounding environment may reinforce one another. Conditions for recognising manipulation, understanding the situation, seeking support and leaving the relationship are inadequate. These constraints can be described as restrictions on $I$, $P$ and $Q$, rather than assigned measured scores.

She does not face a choice with adequate options and symmetrical information. Actions, attachment or apparently active responses cannot be understood apart from these conditions.

**The existence of action does not establish adequate conditions for choice.**

In symbolic form:

$$
\text{Action}\not\Rightarrow\text{Full Responsibility}.
$$

The point is not to score her self-authorship, but to show that restricted room for action may coexist with devastating harm. Someone’s activity as a subject does not establish consent to harm or grounds for assigning responsibility for it.

Violence threatens not only safety, but also the conditions for understanding, forming and living one’s own life.

### The Narrator of *The Lover*: Constraint and Initiative Together

The narrator of *The Lover* also occupies a position shaped by intersecting conditions of age, gender, colonial relations, class and economics. The concern here is how the narrative presents both constraint and the expression of desire, not whether this means unequal power has disappeared.

Her observations of her desires, money and other people can be read as clues to self-authorship $S$. Some of her understandings and actions also suggest that structures have not eliminated initiative. Yet retrospective narration should not be treated as fully developed judgement already present when the events occurred, still less as proof of adequate conditions for refusal and exit at that time.

Within AD, this essay describes this state as ‘restricted $C$ coexisting with visible self-expression’. If relatively high $S$ is adopted as an interpretive proposal, $A=C^\alpha S^\beta$ expresses how someone may form a direction and act within a limited space. But $S$ cannot replace missing conditions for action.

The comparison with Fang Si-Chi does not rank their agency. It asks how different works present desire, information, power and room for action. Different forms of expression and responses to trauma cannot directly rank autonomy.

**Being within a power structure does not mean being entirely determined by it; showing initiative does not establish adequate conditions for choice.**

Age matters to the conditions for action, but is not an on–off switch for activity as a subject. Recognising minors’ desires and expression does not mean they have conditions for choice or responsibilities equal to those of adults.

### A Conceptual Comparison of the Three Cases

The table summarises the essay’s readings, not measurements of characters or empirical validation.

| Case | Interpretive reading within the framework | What cannot be inferred |
| --- | --- | --- |
| Ada | A relatively clear direction $S$ is connected with efforts to secure conditions for action $C$ under constraints | A choice being one’s own makes it right, or makes one responsible for harm inflicted by others |
| Fang Si-Chi | $C$ is severely restricted within a particular relationship, especially information, relative power and exit conditions | Responding or acting establishes adequate choice or responsibility for abuse |
| The narrator of *The Lover* | Restricted $C$ coexists with desire, judgement and action visible in the narration | More active expression establishes adequate conditions for consent or greater agency than other victims |

The cases shift the question of freedom towards two levels: what practicable choices does someone have in a particular situation, and how does she understand, reflect on and organise them? The first corresponds mainly to $C$, the second to $S$. This essay’s $A$ attempts to describe their joint contribution.

## Agency, Responsibility and Actual Consequences

Even if Effective Agency $A$ could be described, moral responsibility could not be derived from it alone. To indicate that responsibility judgements involve different conditions, write provisionally:

$$
\mathcal R_i=\Phi(A_i,U_i,P_i,H_i).
$$

- $A_i$: the Effective Agency the subject can actually exercise.
- $U_i$: conditions for understanding an action and foreseeing its consequences.
- $P_i$: relative power within the relationship.
- $H_i$: the action’s actual causal contribution to the outcome.

This expression lists only some relevant factors. It is not a complete formula for calculating responsibility, nor does causal contribution automatically equal moral responsibility. Age, coercion, consent, particular obligations and others’ actions still require separate consideration. The discussion concerns moral responsibility and provides no rules for determining legal liability.

Actual consequences, denoted by $Y_i$, are another distinct question:

$$
Y_i\not\equiv\mathcal R_i.
$$

Reality does not distribute consequences fairly according to moral responsibility. Lacking resources to resist harm, seek support and rebuild life may expose people with lower capacity to heavier consequences. This is not an inevitable outcome in every situation.

It is therefore insufficient to ask who made which choice. What could she choose? How did she understand her situation? Who could change the rules, leave the relationship or shift risks elsewhere? Who ultimately bore the consequences?

## From Judgements of Agency to Conditions and Distribution

AD concerns conditions for action, a direction of one’s own and their dynamics, rather than labelling people as having or lacking agency.

People begin from different $C_0$, live within different $X$, face different maintenance costs $M$ and depletion $D$, and have different opportunities to develop $S$. These differences cannot simply be reduced to individual effort or courage.

The question ‘Are people free?’ thus also becomes a question about practical conditions. How are possibilities for action created, restricted, accumulated and depleted? How do support and institutions change those conditions? How do people form directions they are willing to claim as their own within them?

From this perspective, agency is neither a purely personal quality nor entirely reducible to the product of structures. People do not choose in a vacuum, but may still express themselves, judge and act within constraints.

Where we actually live is precisely that unstable space between the two.
