<script>
	import '../app.postcss';
	import avatarImg from '$lib/assets/martin-300x300.png';
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { filter, XPro, Noir } from '@skeletonlabs/skeleton';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { initializeStores, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	initializeStores();

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	const popupClick = {
		event: 'click',
		target: 'popupClick',
		placement: 'left'
	};

	// Open Close Drawer Functions
	const drawerStore = getDrawerStore();
	const drawerOpen = () => {
		drawerStore.set({ open: true });
	};
	function drawerClose() {
		drawerStore.close();
	}
</script>

<!-- App Drawer -->
<Drawer>
	<div class="flex items-center">
		<button class="btn btn-primary" on:click={drawerClose}>
			<span>
				<svg
					class="fill-token h-5 w-5 ml-2 mt-5 mb-5"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					><polygon
						points="3.828 9 9.899 2.929 8.485 1.515 0 10 .707 10.707 8.485 18.485 9.899 17.071 3.828 11 20 11 20 9 3.828 9"
					/></svg
				>
			</span>
		</button>
	</div>
	<hr />
	<Navigation />
</Drawer>

<!-- App Shell -->
<AppShell
	slotHeader="shadow-md"
	slotSidebarLeft="bg-surface-500/5 w-0 border-r-0 border-r-surface-200 dark:border-r-surface-500 lg:w-64 lg:border-r"
>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>

	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex gap-1">
					<button class="lg:hidden btn-icon" on:click={drawerOpen}>
						<span>
							<svg class="fill-token w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
								><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg
							>
						</span>
					</button>
					<button>
						<a href="/"><img src="/favicon.png" alt="" /></a>
					</button>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<LightSwitch />
				<button type="button" class="btn-icon" use:popup={popupClick}>
					<Avatar
						initials="MS"
						background="bg-primary-500"
						border="border-2 border-primary-600 hover:!border-primary-900"
						shadow="shadow-sm"
						cursor="cursor-pointer"
						src={avatarImg}
						width="w-11"
						rounded="rounded-full"
						action={filter}
						actionParams=""
					/>
				</button>
				<div class="card p-4 variant-filled-primary shadow-xl" data-popup="popupClick">
					<h4 class="h4 font-semibold">Martin Sebastian</h4>
					<button class="btn my-1 text-sm flex">
						<svg
							class="w-4 variant-filled rounded-sm"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 50"
							><path
								d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"
							/></svg
						>
						<a href="https://twitter.com/martisebastian" class="" target="_blank">@martisebastian</a
						>
					</button>
					<div class="arrow variant-filled-primary" />
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<!-- (pageFooter) -->
	<svelte:fragment slot="footer">
		<div class="container flex flex-row">
			<div class="flex-auto text-sm m-4 text-gray-500">&copy; 2023 MARTINSEBASTIAN.IO</div>
			<div class="flex-auto text-right m-4 absolute right-0">V.1</div>
		</div>
	</svelte:fragment>
</AppShell>
