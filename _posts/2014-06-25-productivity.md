---
layout: post
title: JavaScript and clean coding
---
\\[ \dfrac{TeamDiscipline}{LanguageExpressiveness * NumberOfCollaborators} = Productivity\\]

**tl;dr** An expressive, loosely-typed language, like JavaScript, can only be used in a large scale project if standards, however arbitrary, are rigorously and ruthlessly enforced.

Lately, I've been reading Robert C. Martin's [book](http://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship-ebook/dp/B001GSTOAM/ref=sr_1_1?ie=UTF8&qid=1403746623&sr=8-1&keywords=clean+coding) *Clean Coding*. I've also been engaged in a long-running discussion with a very knowledgeable friend about the merits of Node.js compared to Java for large scale applications.

He's not a fan of Node. My guess is that Martin wouldn't like it much either. But I am unsure.

The problem seems to be this: JavaScript is a very *expressive* language. A *lot* can be done with just a few lines of code. It is also a loosely-typed language. It is, overall, not a very *rigid* language. To be maximally precise, if there is a problem to be solved, there will be dozens of ways to solve it in JavaScript, with some being very clearly worse than others but not one being unequivocally the best. The choice of using a functional style, a protypal object-oriented style, or aping a classical object-oriented style (using constructor functions to simulate classes, etc.) is left up to the developer.

Which means, in a collaborative environment, that it is left up to each and every developer.

Not only that, but even if a choice is made, nothing stops a developer from being inconsistent, from being functional in this part of the code, more classical over here, or even avoiding the OO features of JavaScript entirely to be boring and procedural. JavaScript allows you to do it.

This is a problem. Obviously, you'd have to be a *really* bad developer, or maybe just a wickedly devious one, to flip flop from style to style like this. No one would do that, right?

Sure. But a single devious or supremely incompetent developer is not the problem. The problem is a *team* of developers, none of whom is totally incompetent or devious, but each of which is sometimes less competent -- or, more precisely, less *disciplined* -- than he or she could be.
Spontaneous Order & A Million Acts of Care
----------------------------------------------------------
Bringing me to Martin's book. I haven't finished it yet. I loved the forward; especially this quotation:
> Quality is the result of a million selfless acts of care -- not just any great method that descends from the heavens.
The reference need not to a million acts of a single individual, but to many different acts by many different people. If care is lacking from one or two of those acts, the difference in quality may be negligible. If there is a pervasive lack of care, disaster will result.

How to explain this? F.A. Hayek described [spontaneous order](http://en.wikipedia.org/wiki/Spontaneous_order), the idea of an overall order emerging from the acts of individuals, most or all of whom did not seek to create that order. A million selfless acts of care *add up to* something that is *more than* the sum of all those choices.

Conversely, too many "isolated" uncaring acts can corrupt a process and undermine the final product, without any individual actor being grossly incompetent or malicious. All that is required is a sufficient number of uncaring acts, each isolated from all the others. The more collaborators there are, the more this can occur -- that is, unless team discipline prevents uncaring acts, or provides a fix for them before their effects multiply.

That's why my equation looks like it does. Other things being equal -- and this has been true in my experience -- the more collaborators there are, the more discipline will be required after a certain point to maintain productivity.

Spontaneous Disorder In Spite of Discipline
-------------------------------------------------------
But what about the other variable, language expressiveness?

It seems to me that language expressiveness, in the sense I earlier described it, can cause spontaneous disorder despite discipline. If there is a single way to solve a problem, then by definition that is the most efficient way to solve it. If there are multiple ways to solve a problem, but one is theoretically more efficient, then a sufficiently competent team will eventually arrive at that solution.

But if there are multiple ways to solve a problem, and none is *clearly* more efficient than the other, then the choice between the solutions will be somewhat arbitrary. The arbitrariness will lead to inconsistency. Why solve all problems of type X in the same way? Why not solve some problems of type X in one way, some in another? Will this inconsistently *inevitably* emerge, given a sufficiently expressive language? I am not sure. If so, that is a problem for JavaScript, because JavaScript is very expressive.

If I am right, large JavaScript projects will have a tendency toward spontaneous disorder, even with a disciplined team. This is because *discipline is itself insufficient to provide answers to the questions an expressive, loosely-typed language raises*. *No* amount of discipline -- none of the principles Martin articulates -- can provide a definitive answer to *how* a complex problem should be solved in JavaScript.

It is also clear that the severity of this problem scales up with the number of developers. More developers equals more arbitrariness, more decisions made with insufficient reason. One developer can be satisfied doing things one way, just because he has decided that is how things shall be done. Two developers may come to an agreement between them. Three or more? Must management ultimately decide?

That may, in fact, be the answer. When market forces are insufficient to provide an important good, there are those who believe the government ought to provide it. Similarly, when a million selfless acts of care cannot yield quality, then maybe it is time for a higher authority to set standards, no matter how arbitrary those standards are.
