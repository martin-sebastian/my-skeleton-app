<script>
	import { onMount } from 'svelte';
	let articles = [];
	let show = false;
	function getContent(xmlObj, tagName) {
		return xmlObj.getElementsByTagName(tagName)[0].textContent;
	}
	onMount(async () => {
		await fetch('https://cors-anywhere.herokuapp.com/https://www.gezondheidsnet.nl/nieuws.xml')
			.then((res) => res.text())
			.then((text) => new window.DOMParser().parseFromString(text, 'text/xml'))
			.then((data) => {
				let channel = data.getElementsByTagName('channel');
				let items = Array.prototype.slice.call(channel[0].children);
				items.forEach((item) => {
					if (item.tagName === 'item') {
						articles.push({
							title: getContent(item, 'title'),
							description: getContent(item, 'description'),
							thumbnail: item.getElementsByTagName('enclosure')[0].getAttribute('url'),
							source: item.getElementsByTagName('source')[0].getAttribute('url')
						});
					}
				});
			});
		show = articles.length;
	});
</script>

{#if show}
	{#each articles as article}
		<h4>{article.title}</h4>
		<img src={article.thumbnail} alt="thumbnail" />
		<p>{article.description}</p>
	{/each}
{:else}
	<p>loading...</p>
{/if}
