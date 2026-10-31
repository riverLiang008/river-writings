# A Self–Structure Tension Model (SSTM)

*Written in Chinese by River. Translated into English by ChatGPT.*

## Introduction

This essay records an inquiry into the relationship between the self and external structures. It began with a question that troubled me while reading history: why do different people change so differently when confronted with great power?

After acquiring power, some people seem to organise their behaviour and judgements entirely around their new identity; others appear to retain concerns beyond their role. But does continuity in someone’s behaviour mean that they have not become dominated by a role? Does significant change necessarily mean that they have lost themselves? Neither question can be answered simply by saying that someone has or has not changed.

Power is only one of the many structures people encounter. Institutions, organisations, culture, families and social relationships shape people while also providing conditions for action. Becoming a student, manager, parent or public figure means entering a new role, with new expectations and responsibilities.

The question I want to pursue is this: as a role continually shapes a person, can that person still reflect on, refuse or adjust the role and its demands? This capacity does not mean rejecting change. By actively accepting responsibilities and revising their values, people may also bring about changes they are willing to claim as their own.

I provisionally call this perspective *A Self–Structure Tension Model* (SSTM). I begin by defining self, role and structure, then introduce some notational conventions for describing their relationships. Finally, I return to historical figures to consider what this perspective helps us see, and where it cannot support a judgement.

### Scope and Limitations

This essay does not yet establish an empirical model that can be measured and tested. Symbols and equations organise concepts and make assumptions explicit. They cannot replace evidence, nor does formal resemblance alone confer the explanatory power of theories from other disciplines.

The historical cases provide material for discussing the framework, rather than validating it. Public actions and historical records permit limited observations, but they do not directly reveal someone’s inner state, still less justify precise numerical scores for their autonomy. Actions may admit several explanations, which must be considered separately.

Nor does this essay equate autonomy with moral character, happiness or an unchanging personality. Someone may autonomously make cruel choices, or retain multiple ways of understanding under restrictive conditions. Describing these differences cannot replace an evaluation of particular actions and their consequences.

This essay developed through sustained discussion with ChatGPT. The author posed the questions and participated in developing and revising the framework; ChatGPT served as a thinking partner in clarifying concepts, working through arguments and organising language. The sources of particular concepts and materials still require separate attribution. Discussion between a person and an AI is not itself evidence for a conclusion.

## Conceptual Framework

### Self, Role and External Structure

This essay distinguishes three concepts:

- **Self ($S_t$):** a person’s values, concerns, memories, and ways of reflecting on and organising experience at a particular moment. This does not presuppose an unchanging ‘true self’ entirely separate from society.
- **Role ($R_t$):** the expectations, responsibilities and ways of acting associated with a particular position. A person may occupy several roles simultaneously.
- **External Structure ($E_t$):** conditions including institutions, culture, social relationships, and the distribution of resources and power. Power, $P_t$, is one dimension of particular interest here.

Role is an important interface between self and external structure, though not the only one. Their interactions can provisionally be written as:

$$
\begin{cases}
S_{t+1}=f(S_t,R_t,E_t),\\
R_{t+1}=g(R_t,S_t,E_t),\\
E_{t+1}=h(E_t,R_t,S_t).
\end{cases}
$$

This notation expresses a proposed interaction: structures shape roles, roles affect the self, and human actions may also revise roles and structures. No functional forms, strengths of influence or rates of change have been specified, so these expressions cannot predict a particular trajectory of personal change. Structures such as institutions are also affected by many individuals and events; the self in these equations should not be read as a single person sufficient to determine a structure alone.

Here, $S_t$ describes a state. It is not a score for which a larger value is better.

### Role Identification and Role Dominance

Identifying with a role is not the same as being dominated by it. Someone may identify strongly as a parent, teacher or manager while still reflecting on that identity’s demands, considering other people’s circumstances and judging between different values.

The concern here is **role dominance**: the extent to which role demands exclude other judgements and choices. For discussion, this is provisionally represented on an idealised scale:

$$
0\leq D_R(t)\leq 1.
$$

$D_R=0$ means that role demands have not narrowed the person’s room for reflection and alternative judgements. $D_R=1$ means that, in the situation under discussion, role demands entirely dominate judgement and choice. These endpoints are conceptual limits, not direct descriptions of any identity or category of people.

Role dominance must also be considered in context. The same person may behave differently at work, at home and in public life. Using a single scale simplifies the discussion; it does not mean that these differences can actually be measured as one number.

### Degree of Self-Autonomy

Here, **autonomy** means the extent to which a person can still reflect on role demands, form judgements and, where feasible, adjust their relationship with the role. External conditions constrain autonomy, so it cannot be judged simply by whether someone successfully refuses a demand.

To name the other end of the role-dominance scale, this essay stipulates:

$$
I_S(t):=1-D_R(t).
$$

$I_S$ is called the ‘degree of self-autonomy’. Within this simplified framework, it is not an independently measured variable, but a complementary representation of $D_R$. This definition does not explain how autonomy develops, nor imply that people with less autonomy have less worth.

Remaining autonomous does not mean remaining unchanged. Actively embracing a new role or reconsidering an earlier judgement may express autonomy. Conversely, long-standing behavioural continuity may arise from habit, stubbornness, or circumstances that have simply not challenged existing judgements.

### Multiplicity of Interpretive Frameworks

$M$ denotes **multiplicity**: the capacity to accommodate different ways of understanding and to distinguish, compare and revise them.

For example, when interpreting a conflict, can someone consider emotions, institutional responsibilities, trust or aesthetics as well as competition for power? These are not independent, directly countable items. Accordingly, $M$ is not treated here as a simple count of interpretive frameworks, and has no established unit of measurement.

Having several identities does not automatically imply a high $M$. Someone who is simultaneously a manager, parent and friend may still apply the same logic of domination in every relationship.

### Tension Within the Self: A Provisional Expression

‘Tension’ here describes a condition in which a person retains room for reflection and different ways of understanding while being shaped by roles. It is neither the intensity of psychological conflict nor a score for morality or happiness.

To emphasise the joint importance of autonomy and interpretive multiplicity, one can try the following multiplicative expression:

$$
T:=I_S M=(1-D_R)M,\qquad M\geq 0.
$$

This is a **modelling convention**. It makes both factors contribute to $T$ and stipulates that the product is zero if either factor is zero. These properties follow from the chosen form; they are not empirical findings. Whether multiplication is appropriate, whether the two dimensions are independent, and how different situations might be compared remain open questions.

‘Tension’ is used only in this restricted sense. A higher $T$ does not necessarily mean a better life.

### Changes in Power and Conditional Hypotheses

Power may make role demands more prominent, but it may also increase resources for leaving a situation, seeking help or adjusting a role. Whether increasing power raises role dominance is therefore a question to investigate.

Under certain conditions, one can hypothesise that, holding other relevant conditions constant, increasing power may raise role dominance:

$$
\frac{\partial D_R}{\partial P}>0.
$$

This is not a universal rule. The response of role dominance to power may be positive, zero or negative, and may change with context and time. Even if power and role dominance are observed to rise together, other influences must be ruled out before a causal relationship can be discussed.

Moreover, an increase in $D_R$ alone does not imply a decrease in $T$. Along a differentiable path parameterised by $P$, the multiplicative definition gives:

$$
\frac{dT}{dP}
=-M\frac{dD_R}{dP}
+(1-D_R)\frac{dM}{dP}.
$$

This derivation shows only that changes in role dominance and interpretive multiplicity must be considered together. For example, if $M>0$, $dM/dP=0$, and $dD_R/dP>0$ along this path, then $dT/dP<0$. If $M$ also changes, the effects of both terms must be compared.

The total derivative describes joint variation along the selected path. It is not the independent causal effect of power with other conditions held constant. This essay makes no numerical estimates of these changes.

### Summary and Approach to the Cases

The framework provisionally offers three perspectives: whether role demands exclude other judgements; whether someone retains room to reflect on and adjust a role; and whether their ways of understanding the world become narrower.

The feedback formulation reminds us that self and structure can affect one another. It has affinities with the concerns of cybernetics—feedback, regulation and the persistence of systems—but no analysable feedback mechanism has yet been specified here. It therefore cannot establish stability, convergence or any particular dynamic process.

When approaching a case, the following questions should be asked separately:

1. What actions do historical sources record, and what are the sources’ limitations?
2. Could institutions, health, alliances or practical circumstances also explain these actions?
3. Which materials support an interpretation in terms of role dominance, and which conflict with it?
4. Can the framework distinguish continuity of behavioural style from the retention of reflective capacity?

Classifications and curves are interpretive proposals for discussion, not measurements. If a case does not fit the framework, it should be allowed to change the framework rather than merely illustrate a predetermined conclusion.

## Case Analysis

This section uses several historical rulers to discuss possible relationships between power, self and role.

The cases below are interpretive exercises using SSTM. Assessments of variable levels, directions of change and curve shapes are the author’s qualitative judgements based on selected materials, not measurements or fitted results. Equations represent relationships between these judgements; other materials and interpretations may alter them. ‘Higher’ and ‘lower’ apply only within the situations discussed. They neither establish precise rankings across individuals nor assess their moral worth.

- **Ancient China:** Liu Che, Zhu Yuanzhang, Li Zhi and Liu Bang.
- **Ancient Rome:** Augustus and Marcus Aurelius.

To compare paths of change, the discussion provisionally uses the labels ‘low collapse’, ‘high collapse’ and ‘oscillatory’, referring respectively to weaker role dominance, increasing role dominance, and repeated adjustment. These are not fixed classifications of individuals; their applicability depends on the evidence. Marcus Aurelius serves only as a point of comparison here, without a separate analysis.

### Li Zhi

In some popular accounts, Li Zhi is portrayed as weak and indecisive. This impression may owe something to the more prominent historical images of his father, Li Shimin, and his wife, Wu Zetian: beside them, his own political actions and personal characteristics can be overlooked.

When reading about these figures, I once focused particularly on their achievements and was inclined to understand certain brutal political actions as necessary means of maintaining rule. But that interpretation may too quickly make actions seem inevitable, overlooking differences between circumstances, institutional conditions and individual choices.

This gave power a somewhat frightening quality for me.

At the same time, I kept wondering: might highly concentrated power conflict with personal happiness? Can someone in that position retain a life and forms of judgement not entirely organised around power?

Ancient rulers offer a starting point. They occupied positions of concentrated power while facing political competition, institutional constraints and changes in personal circumstances. How these factors influenced their judgements requires analysis of their particular experiences.

Power does not belong only to rulers or political life. In companies, groups and even relationships between two people, differences in who can decide and who can more readily refuse may reflect differences in power. Examining rulers’ experiences is thus also an attempt to use extreme cases to understand how power affects relationships and how people change within them.

In Li Zhi’s case, I am especially interested in Wu Zetian’s participation in decision-making and his role in that process.

First, ‘participating in discussion’ should be distinguished from ‘holding decision-making authority’: the former influences decisions through advice, whereas the latter directly participates in the final decision. In practice, these may overlap, and titles alone do not establish actual influence. Li Zhi and Wu Zetian’s relationship must therefore be examined through both institutional authority and decision-making practice.

To illustrate the distinction, imagine an arrangement that provides support without direct participation in final decisions:

- Wu Zetian organises memorials and analyses advantages and disadvantages;
- offers advice;
- coordinates ministers;
- or even reads edicts on the emperor’s behalf.

In this hypothetical arrangement, final decisions still require the emperor’s approval.

For what is commonly called the ‘joint rule of the Two Sages’, the questions are how Wu Zetian participated in setting agendas, forming decisions and implementing them, and how court officials understood and responded to her views.

A modern company provides an analogy for distinguishing three arrangements. It illustrates differences in authority, not an equivalence between ancient political institutions and corporate governance.

**First: the secretarial arrangement.**

CEO: ‘Organise these materials for me.’

The secretary has no final decision-making authority in this matter.

**Second: the advisory arrangement.**

CEO: ‘Your suggestion is good. I will consider it.’

The CEO still makes the final decision.

**Third: joint management.**

CEO: ‘From now on, we will decide major matters together.’

Other managers know:

‘We can approach either the CEO or the other person in charge.’

Here, both leaders participate in decisions, making the arrangement closer to co-governance.

The co-rule of Marcus Aurelius and Lucius Verus offers another point of comparison, particularly concerning the relationship between nominal co-rule and actual decision-making authority.

Actively sharing decision-making authority means accepting others’ participation in judgement, along with the risks of disagreement and a reduced sphere of personal control.

Someone whose security depends chiefly on controlling others may find this harder to accept. Yet centralisation and decentralisation are also shaped by institutions, political alliances and practical circumstances. Sharing power alone cannot establish whether someone is weak, confident or secure.

What merits examination, then, is not only the distribution of power, but how a ruler faces different views, handles disagreement and responds to opportunities to revise a judgement. Such behaviour may offer clues to the relationship between a person and their role.

Wu Zetian’s gradual participation in decisions and Li Zhi’s responses also require attention. Her acquisition of power cannot be reduced to his support; it must also be understood through her own political actions, court relationships and institutional conditions. The questions most relevant here are how far Li Zhi accepted her actual influence on decisions, and how he handled disagreements between them.

Within SSTM, this essay leans towards treating Li Zhi as a reference case of ‘low collapse’. Being emperor does not necessarily require monopolising every decision; accepting others’ substantive participation can be understood as an adjustment in how the role is exercised. On this reading, high power $P$ can coexist with relatively low role dominance $D_R$, and correspondingly higher self-autonomy $I_S=1-D_R$.

A further hypothesis is that, over the range of power changes under discussion, Li Zhi’s role dominance increased relatively slowly: $\frac{\partial D_R}{\partial P}$ was relatively small. This differs from a low $D_R$ at a particular moment. The former concerns sensitivity to change, the latter a state at that moment. They must be discussed separately using decision-making practices from different periods.

If openness to different views is also read as evidence that multiple ways of judging, $M$, remain available, then $T=I_S M$ expresses this interpretation: someone in a position of great power may retain relatively high tension within the self. The crucial question is whether participation actually allows different judgements to coexist, rather than merely adding another participant.

### Liu Bang

Evaluations of Liu Bang often differ. The question here is whether certain behaviours remained continuous from his early life into his reign, and what that continuity can establish.

From commoner to emperor, Liu Bang underwent a significant change in status. Some accounts also draw attention to possible continuities in his behaviour before and after becoming emperor.

In his youth, he enjoyed drinking with local notables, obtaining credit and teasing others; as a local official, he often travelled about with companions. After becoming emperor, something of this informal manner remained. He publicly mocked scholars at court, even taking off a scholar’s cap to use as a chamber pot because scholars were overly ceremonious; on returning to his hometown of Pei, he drank and reminisced with the elders as an ordinary person might. With his father, he did not always maintain an emperor’s sacred image, but could speak in the joking manner of their earlier relationship.

His treatment of meritorious followers also continued the strong pragmatism of his rise to power: he could take people into his confidence when he needed them, yet strip them of authority or execute kings outside the imperial clan, including Han Xin, Peng Yue and Ying Bu, when he no longer did.

These accounts may suggest continuities in speech and conduct. They do not, however, establish that he always followed the same reasoning in different relationships, or that becoming emperor did not alter his understanding of himself.

Liu Bang also attached importance to imperial authority. His actions included:

- killing kings outside the imperial clan;
- establishing centralised rule;
- instituting court ritual, despite finding Shusun Tong’s procedures cumbersome;
- upholding imperial authority.

Retaining earlier behavioural traits therefore does not make imperial identity merely an external label. ‘I am Liu Bang, and so I am emperor’ can serve as an interpretation emphasising personal continuity, but cannot be taken as his own understanding of himself. What needs examination is how these traits coexisted with the defence of imperial authority, and when they came into conflict.

Within SSTM, this essay places Liu Bang provisionally on the side where ‘personal style was not entirely replaced by the imperial role’. The persistence of earlier modes of expression and interaction offers a starting point for a hypothesis of low role dominance: a large change in power, $\Delta P$, does not mean that the self can only be reorganised around a standardised image of an emperor.

On this reading, relatively low $D_R$ and relatively high $I_S=1-D_R$ can describe the possibility of personal style coexisting with role. But stylistic continuity is indirect evidence. If these habits also serve rule, they may not indicate a capacity to reflect on or adjust role demands. ‘Personality absorbs identity’ is an image emphasising personal style, not a substitute for a judgement about autonomy.

Nor can continuity of speech alone establish a small $\frac{\partial D_R}{\partial P}$. To discuss tension through $T=I_S M$, one must distinguish between different ways of judging in different relationships and the application of one logic of power to every relationship. The former supports an interpretation of higher $M$; the latter weakens it. The point of the Liu Bang case is therefore to distinguish continuity of personal style from self-autonomy, rather than equate them.

### Augustus

Augustus offers another perspective on self and role. This essay approaches changes in identity and adjustments of role through the relationship between Octavian’s personal experiences and Augustus’s role as ruler. This is an interpretive perspective, not direct knowledge of his inner experience or proof that he consciously separated the two.

His experiences can first be divided into stages, with actions and institutional arrangements examined separately in each:

- Youth: early experiences and the formation of political identity.
- The Second Triumvirate: changes in political relationships and roles.
- After the civil wars: adjustments in arrangements of rule.
- The establishment and continuation of the ‘First Citizen’ role: the relationship between public identity and personal action.

![Illustrative curves of power and role relationships for Liu Bang, Li Zhi, Zhu Yuanzhang and Augustus](/images/thought-experiments/sstm-graph.jpg)

*Figure: a conceptual illustration of different paths of change, not historical data or measurements of individuals. The vertical axis retains the original label and scale, which differ from the definition of role dominance in this essay; see below.*

The red line for Augustus repeatedly fluctuates around an upward trend, without an obvious decrease in amplitude: an ‘oscillation around an upward trend’. Its local declines can illustrate the possibility that role dominance does not always increase monotonically with power. They do not directly prove that a historical person consciously recovered autonomy.

To express only this shape, an illustrative function might be:

$$
Z(P)=aP+b\sin(\omega P),\qquad a,b,\omega>0.
$$

$Z$ denotes an illustrative, unnormalised vertical axis; $a$ is the slope of the upward trend, $b$ the oscillation amplitude, and $\omega$ the oscillation frequency. This function has not been fitted to image data and does not reconstruct the formula used to generate the original graph. Its slope is:

$$
\frac{dZ}{dP}=a+b\omega\cos(\omega P).
$$

When $b\omega>a$, the curve can decline over some intervals while retaining an overall upward trend.

The graph labels its vertical axis ‘Role Distance ($D_R$)’, with values exceeding 1. This essay defines $D_R$ as role dominance on $[0,1]$. The figure’s different label and scale are retained solely to compare curve shapes. Its values cannot be substituted directly into $I_S=1-D_R$, nor do they represent comparable measured scores for historical figures.

Historical stages, moreover, are ordered in time, while the horizontal axis represents power $P$. The two cannot be substituted for each other. Applying this shape to a case requires a defined scale for comparing power and materials supporting each rise and fall. The curve cannot itself be evidence about a person’s life.

This essay provisionally reads Augustus as a case of ‘repeated adjustment’: the relationship between personal experience and public role may form through multiple adjustments rather than being settled once. Within the framework, this can be expressed as fluctuations in $D_R$ and inverse changes in $I_S=1-D_R$. If interpretive multiplicity $M$ remains temporarily constant, $T=I_S M$ changes accordingly; if $M$ also changes, both must be considered. Repeated adjustment between role and self does not imply eventual stability or necessarily increasing autonomy.

### Zhu Yuanzhang and Liu Che

Zhu Yuanzhang and Liu Che offer material for another possibility: as power conditions change, does judgement increasingly revolve around control, threat and the security of rule? ‘High collapse’ provisionally describes this possibility, without assuming in advance that either ruler belongs to the category.

If the materials support increasing role dominance alongside growing power, one can discuss whether $\frac{\partial D_R}{\partial P}>0$ applies. Behavioural change alone does not establish this relationship; power, institutions, age and particular events must be distinguished.

Zhu Yuanzhang underwent significant changes in status and power. His $\Delta P$ can be discussed through his early circumstances and later institutional position as emperor, but no scale presently supports precise ranking against other figures. Early reliance on generals and meritorious followers, and later treatment of those followers and concentration of power, are materials for comparison. From the Hu Weiyong case to the Lan Yu case, what roles did political competition, institutional arrangements and individual judgement play? Do these materials support an increasingly threat- and control-centred understanding of relationships? Outcomes alone cannot establish a change in personality caused by power.

Liu Che began from a different position, growing up within the imperial system. The focus is therefore not a transition from commoner to emperor, but changes in power conditions and decision-making during his reign. Constraints imposed by imperial relatives and regional kings, the *tui’en* decree, warfare and oversight, the witchcraft affair, and the policy adjustments in the Luntai edict offer points of observation at different stages. In particular, did a policy change reflect altered circumstances, strategic adjustment or reflection on earlier judgements? These support different interpretations and cannot be assigned in advance to one trajectory of personal change.

In this essay’s provisional interpretation, Zhu Yuanzhang and Liu Che are candidates for ‘high collapse’. If threat and control increasingly organise judgement, role dominance $D_R$ rises and self-autonomy $I_S=1-D_R$ falls. If other ways of understanding are displaced at the same time, $M$ also falls, yielding an interpretation of declining tension, $T=I_S M$.

Every step in this chain is conditional. A joint rise in power $P$ and $D_R$ does not automatically establish the independent influence expressed by $\frac{\partial D_R}{\partial P}>0$. Cruel actions do not automatically imply low autonomy or low multiplicity. What needs support is a change in the space for judgement, not merely whether actions meet moral expectations. Evidence of policy adjustment and self-correction should also be considered as potentially altering this interpretation.

### A Provisional Comparison of Paths

The table outlines paths for investigation, not a final classification of historical figures.

| Label | Relationship to examine | Relevant cases |
| --- | --- | --- |
| Low Collapse | Whether room to reflect on and adjust role demands remains at high $P$; stylistic continuity alone does not establish low $D_R$ | Li Zhi and Liu Bang; Marcus Aurelius has not been separately developed |
| High Collapse | Evidence of increasing role dominance, and whether it supports $\frac{\partial D_R}{\partial P}>0$ under particular conditions | Zhu Yuanzhang and Liu Che |
| Oscillatory | Whether $D_R$ undergoes repeated adjustment, whether its amplitude changes, and how these changes relate to time and power | Augustus |

## Afterword

This framework grew out of a question I have considered for a long time: what is the relationship between highly concentrated power and personal happiness? We coexist with structures, are influenced and shaped by them, and may also change them through our actions.

At first, I was simply trying to understand certain historical figures. Why do some people seem almost transformed after acquiring power, while others retain continuities in their personality even at the highest level? Why do people facing power follow such different paths? Gradually, I realised that these questions might extend beyond history. Power is only one form of structure. Identity, wealth, reputation, knowledge, technology, organisations, families and even an era itself may continually shape a person. We cannot exist outside structures, but neither must we passively become their products.

The framework’s central concern is therefore not to judge a particular emperor or explain every historical phenomenon through a mathematical model. It offers a perspective on people’s relationships with structures: as circumstances change and someone acquires greater resources, responsibilities and influence, what changes? What, if anything, remains?

Writing the framework down will in turn affect my own thinking. Perhaps, looking back many years from now, what remains will not be a particular judgement about Li Zhi or Augustus, but the question it represents: how can people keep from losing themselves as they enter different structures?

Perhaps there is no single answer. Refusing to change does not make someone authentic, nor does continual change necessarily mean losing oneself. The difficulty may lie in still being able, after entering new roles, taking on new responsibilities and gaining new power, to recognise which changes arise from one’s active choices and which are traces left by structures. Looking back, we might still be able to say: those changes belong to me; I did not merely become an extension of an identity, a power or a structure.

If this framework leaves anything behind, I hope it is a habit of continuing to ask questions rather than a conclusion about historical figures. At every important transition in identity, I want to ask again: is it my situation that is changing, or myself?
