<script>
    import { getDrawerStore } from "@skeletonlabs/skeleton";

    const drawerStore = getDrawerStore();

    function drawerClose() {
        drawerStore.close();
    }

</script>


<nav class="list-nav p-4">
	<ul>
		<li class="hover:bg-primary-500 hover:text-white rounded-lg"><a href="/" on:click={drawerClose}>Homepage</a></li>
        <li class="hover:bg-primary-600 hover:text-white rounded-lg"><a href="/about" on:click={drawerClose}>About</a></li>
        <li class="hover:bg-primary-600 hover:text-white rounded-lg"><a href="/blog" on:click={drawerClose}>Blog</a></li>
        <li class="hover:bg-primary-600 hover:text-white rounded-lg"><a href="/contact" on:click={drawerClose}>Contact</a></li>
	</ul>
</nav>