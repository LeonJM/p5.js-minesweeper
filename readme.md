# **Leon's p5.js minesweeper**

Problems:
Using the online scripts, i.e. 
```
	<script src = "https://cdn.jsdelivr.net/gh/LeonJM/p5.js-minesweeper/script.js"></script>
	<script src = "https://cdn.jsdelivr.net/gh/LeonJM/p5.js-minesweeper/cell.js"></script>	
```

instead of 
```
	<script src = "script.js"></script>
	<script src = "cell.js"></script>	
```

makes the right click functionality of the mousePressed() not work. Note: only the right click.

The context menu is disabled in the html body. `<body oncontextmenu = "return false">

With local scripts the *marking* feature of script.js works as intended. However using an online source of the 
exact same code disables said *marking* feature.

