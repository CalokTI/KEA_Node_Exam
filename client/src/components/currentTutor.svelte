<script>
/* Images */
let anon = "anonymous.png";

let name = 'Carsten';
let times = '8.30 - 11.45'
</script>

<div>
    <h3>TUTOR</h3>
	<img src={anon} alt="picture of tutor" />
	<p>{name}</p>
	<p>{times}</p>
</div>

<style>
	div {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		font-weight: bold;
	}
	img {
		height: 100px;
	}
	h3 {
		background-color: white;
		margin: 5px;
		margin-bottom: 15px;
	}


	@media (min-width: 640px) {
		div {
			max-width: none;
		}
	}
</style>