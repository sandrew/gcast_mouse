# Google Cast receiver app mouse support

Yeah, I know that Google advices "no mouse events" in Chromecast. But who cares?

Mouse pointer position is sent with standard GCast `sendMessage`.

`MouseEnter` and `MouseLeave` events are simulated with `document.elementFromPoint` function.
`Click` and other pointer events can also be triggered.

Also remember, Chromecast does not have css pointer events, so you have no `:hover` etc. subclasses. You can use `.hover` classes instead.

For instructions how to run this example follow the [Google Cast API documentation](https://developers.google.com/cast/).

Good luck.
