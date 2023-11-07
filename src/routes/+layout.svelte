<script>
	import '../app.postcss';
	import avatarImg from '$lib/assets/martin-300x300.png';
	import logoSvg from '$lib/images/ms-icon-svg.svg';
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
		<button class="btn btn-icon p-5 mx-5 my-2" on:click={drawerClose}>
			<span>
				<svg class="fill-token h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
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
	slotHeader="shadow-sm"
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
					<button class="btn-icon">
						<a href="/">
							<svg
								class="fill-token w-11"
								xmlns="http://www.w3.org/2000/svg"
								width="48"
								height="48"
								viewBox="0 0 48 48"
							>
								<path
									d="m40.97,36.65c-2.52,1.45-13.55,7.79-16.65,9.59-.34.19-.58.19-.92,0-6.69-3.81-13.39-7.62-20.1-11.4-.45-.25-.62-.53-.61-1.05.03-1.9.01-3.8.01-5.81.24.12,13.94,7.82,20.61,11.59.39.22.68.23,1.07,0,1.56-.92,3.14-1.8,4.71-2.69.18-.1.35-.21.58-.35-.2-.13-.35-.24-.5-.33-5.69-3.21-11.39-6.42-17.09-9.61-.53-.3-.71-.62-.71-1.23.04-2.83.02-8.92.02-9.27.75.43,3.72,2.18,4.58,2.65.37.2.49.45.48.85-.03.81.01,1.62-.01,2.43-.01.39.11.6.46.8,7.73,4.43,23.72,13.63,24.08,13.84Z"
								/>
								<path
									d="m8.53,4.66c-2.46-1.4-4.45-2.52-5.33-3.02-.23-.13-.5.04-.5.29-.02,2.61-.03,13.49-.04,19.12,0,.28.15.53.39.66,1.34.73,4.91,2.71,5.46,3.02l.03-20.08Z"
								/>
								<path
									d="m44.5,1.64c-2.57,1.44-14.22,8.07-20.19,11.51-.28.16-.63.16-.92,0-3.15-1.81-7.89-4.52-12.04-6.88v6.66l24.94,14.42c.04-.15.06-.2.06-.25,0-2.04.02-4.07-.01-6.1,0-.2-.21-.47-.4-.58-1.13-.68-5.26-3.06-6.27-3.65,3.2-1.84,6.32-3.63,9.54-5.48,0,.34,0,11.72-.01,17.18,0,.41.1.65.48.84.75.39,4.25,2.44,5.32,3.06V1.94c0-.26-.28-.42-.5-.3Z"
								/>
							</svg>
						</a>
					</button>
					<span class="hidden p-4 lg:block"
						>MARTIN
						<span class="font-semibold">SEBASTIAN</span>
						.IO</span
					>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<button type="button" class="btn p-0 m-0">
					<a href="https://github.com/martin-sebastian" target="_blank">
						<svg class="fill-token w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
							><path
								d="M 32 10 C 19.85 10 10 19.85 10 32 C 10 44.15 19.85 54 32 54 C 44.15 54 54 44.15 54 32 C 54 19.85 44.15 10 32 10 z M 32 14 C 41.941 14 50 22.059 50 32 C 50 40.238706 44.458716 47.16934 36.904297 49.306641 C 36.811496 49.1154 36.747844 48.905917 36.753906 48.667969 C 36.784906 47.458969 36.753906 44.637563 36.753906 43.601562 C 36.753906 41.823563 35.628906 40.5625 35.628906 40.5625 C 35.628906 40.5625 44.453125 40.662094 44.453125 31.246094 C 44.453125 27.613094 42.554688 25.720703 42.554688 25.720703 C 42.554688 25.720703 43.551984 21.842266 42.208984 20.197266 C 40.703984 20.034266 38.008422 21.634812 36.857422 22.382812 C 36.857422 22.382813 35.034 21.634766 32 21.634766 C 28.966 21.634766 27.142578 22.382812 27.142578 22.382812 C 25.991578 21.634813 23.296016 20.035266 21.791016 20.197266 C 20.449016 21.842266 21.445312 25.720703 21.445312 25.720703 C 21.445312 25.720703 19.546875 27.611141 19.546875 31.244141 C 19.546875 40.660141 28.371094 40.5625 28.371094 40.5625 C 28.371094 40.5625 27.366329 41.706312 27.265625 43.345703 C 26.675939 43.553637 25.872132 43.798828 25.105469 43.798828 C 23.255469 43.798828 21.849984 42.001922 21.333984 41.169922 C 20.825984 40.348922 19.7845 39.660156 18.8125 39.660156 C 18.1725 39.660156 17.859375 39.981656 17.859375 40.347656 C 17.859375 40.713656 18.757609 40.968484 19.349609 41.646484 C 20.597609 43.076484 20.574484 46.292969 25.021484 46.292969 C 25.547281 46.292969 26.492043 46.171872 27.246094 46.068359 C 27.241926 47.077908 27.230199 48.046135 27.246094 48.666016 C 27.251958 48.904708 27.187126 49.114952 27.09375 49.306641 C 19.540258 47.168741 14 40.238046 14 32 C 14 22.059 22.059 14 32 14 z"
							/></svg
						>
					</a>
				</button>
				<button type="button" class="btn p-0 m-0">
					<a href="https://twitter.com/martisebastian" target="_blank">
						<svg class="fill-token w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"
							><path
								d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"
							/></svg
						>
					</a>
				</button>
				<LightSwitch />
				<button type="button" class="btn" use:popup={popupClick}>
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
			<div class="flex-auto text-right m-4 text-gray-500 absolute right-0 badge badge-glass">
				V.1
			</div>
		</div>
	</svelte:fragment>
</AppShell>
