<script>
    import { getDrawerStore } from "@skeletonlabs/skeleton";

    const drawerStore = getDrawerStore();
    function drawerClose() {
        drawerStore.close();
    }
</script>

<nav class="list-nav p-4">
	<ul>
		<li class="hover:bg-primary-500 hover:text-white rounded-lg">
            <a href="/" on:click={drawerClose}>
                <svg class="fill-current w-4 h-4 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M8 20H3V10H0L10 0l10 10h-3v10h-5v-6H8v6z"/></svg>
                Homepage
            </a>
        </li>
        <li class="hover:bg-primary-600 hover:text-white rounded-lg">
            <a href="/about" on:click={drawerClose}>
                <svg class="fill-current w-4 h-4 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M8 20H3V10H0L10 0l10 10h-3v10h-5v-6H8v6z"/></svg>
                About
            </a>
        </li>
        <li class="hover:bg-primary-600 hover:text-white rounded-lg">
            <a href="/blog" on:click={drawerClose}>
                <svg class="fill-current w-4 h-4 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M8 20H3V10H0L10 0l10 10h-3v10h-5v-6H8v6z"/></svg>
                Blog
            </a>
        </li>
        <li class="hover:bg-primary-600 hover:text-white rounded-lg">
            <a href="/contact" on:click={drawerClose}>
                <svg class="fill-current w-4 h-4 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M8 20H3V10H0L10 0l10 10h-3v10h-5v-6H8v6z"/></svg>
                Contact
            </a>
        </li>
	</ul>
</nav>