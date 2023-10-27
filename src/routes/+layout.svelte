<script>
	import '../app.postcss';
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
	
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });


	// Open Close Drawer Functions
	const drawerStore = getDrawerStore();
	const drawerOpen = () => {
		drawerStore.set({ open: true });
	}
	function drawerClose() {
        drawerStore.close();
    }					
</script>

<Noir />
<XPro />

<!-- App Drawer -->
<Drawer class="rounded-none">
	<div class="flex items-center rounded-none">
		<button class="btn btn-primary my-5" on:click={drawerClose}>
			<span>
				<svg class="fill-token h-5 w-5 ml-3 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><polygon points="3.828 9 9.899 2.929 8.485 1.515 0 10 .707 10.707 8.485 18.485 9.899 17.071 3.828 11 20 11 20 9 3.828 9"/></svg>
			</span>
		</button>
	</div>
	<hr />
	<Navigation />
</Drawer>

<!-- App Shell -->
<AppShell slotHeader="shadow-md" slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64">
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>

	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="btn btn-primary" on:click={drawerOpen}>
						<span>
							<svg class="fill-token h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
						</span>
					</button>
					<strong class="text-xl uppercase">Skeleton</strong>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<button type="button" class="btn-icon variant-ghost-surface">
					<svg class="fill-token h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-5.6-4.29a9.95 9.95 0 0 1 11.2 0 8 8 0 1 0-11.2 0zm6.12-7.64l3.02-3.02 1.41 1.41-3.02 3.02a2 2 0 1 1-1.41-1.41z"/></svg>
				</button>
				<button type="button" class="btn-icon variant-ghost-surface">
					<svg class="fill-token h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-5.6-4.29a9.95 9.95 0 0 1 11.2 0 8 8 0 1 0-11.2 0zm6.12-7.64l3.02-3.02 1.41 1.41-3.02 3.02a2 2 0 1 1-1.41-1.41z"/></svg>
				</button>
				<button type="button" class="btn-icon variant-ghost-surface">
					<svg class="fill-token h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-5.6-4.29a9.95 9.95 0 0 1 11.2 0 8 8 0 1 0-11.2 0zm6.12-7.64l3.02-3.02 1.41 1.41-3.02 3.02a2 2 0 1 1-1.41-1.41z"/></svg>
				</button>
				<div class="w-5 h-5"></div>
				<LightSwitch />
				<Avatar
					initials="MS"
					background="bg-primary-500"
					border="border-2 border-surface-300-600-token hover:!border-primary-500"
					shadow="shadow-sm"
					cursor="cursor-pointer"
					src="/src/lib/images/martin-300x300.png"
					width="w-12" rounded="rounded-full"
					action={filter}
					actionParams=""
				/>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<!-- (pageFooter) -->
	<svelte:fragment slot="footer">
		<div class="text-sm m-4 text-gray-500">&copy; 2023 Martin Sebastian</div>
	</svelte:fragment>
</AppShell>

