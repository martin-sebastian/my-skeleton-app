<script>
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	// Components
	import { CodeBlock, LightSwitch, Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { filter, XPro, Noir } from '@skeletonlabs/skeleton';

	import { popup } from '@skeletonlabs/skeleton';

	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	const popupClick = {
		event: 'click',
		target: 'popupClick',
		placement: 'bottom'
	};
</script>

<main class="p-8">
	<div class="card p-8 variant-filled-primary" data-popup="popupClick">
		<h2>Martin Sebastian</h2>
		<hr />
		<p>martinsebastian.io</p>
		<hr />
		<p>martinsebastian.io</p>
		<div class="arrow variant-filled-primary" />
	</div>

	<div class="container space-y-5">
		<h1 class="h1">
			<span
				class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
				>Design.</span
			>
			<span
				class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
				>Build.</span
			>
			<span
				class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone"
				>Deploy.</span
			>
		</h1>

		<p>My framework experiment built with SvelteKit and Tailwind CSS, deployed to Vercel.</p>
		<button class="btn variant-filled-primary" use:popup={popupClick}>Click</button>
		<p class="text-left w-auto">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum eros nulla, eu pretium
			massa tristique eu. Ut urna ex, facilisis vitae mattis vel, auctor sed dolor. Sed efficitur
			tincidunt elit quis dignissim. Nulla nisi tellus, cursus in interdum nec, ultrices vel leo.
			Sed malesuada ipsum quis enim pulvinar mattis quis lobortis diam. Curabitur elementum cursus
			orci, eget blandit erat ullamcorper ac. Nam sem odio, malesuada sit amet scelerisque nec,
			porta id odio. Mauris imperdiet eu odio a vehicula. Nulla vel viverra ipsum, eget congue nunc.
			Aliquam sed ex a purus venenatis fringilla ut in dolor. Nullam dui metus, cursus vel blandit
			sed, eleifend ac lectus. Praesent aliquam rhoncus ornare. Lorem ipsum dolor sit amet,
			consectetur adipiscing elit. Phasellus suscipit tellus ac feugiat blandit. Aenean sit amet
			diam dictum, pharetra mauris sodales, molestie orci. Quisque sit amet enim vel lorem suscipit
			laoreet ut sed justo. Ut scelerisque bibendum risus, vel laoreet magna blandit eu. Suspendisse
			semper, mauris sit amet pretium tempus, diam mi finibus tortor, vel semper magna justo egestas
			tellus. Praesent id ante eget elit sagittis pretium. Ut dui nibh, pellentesque a pellentesque
			id, efficitur ac lacus. Sed sit amet dolor risus. Nullam semper dolor eget massa blandit, sit
			amet commodo enim congue. Aenean sit amet lacinia est. In metus lacus, suscipit non hendrerit
			facilisis, efficitur vitae mauris. Praesent vulputate nisl eget purus interdum, ac scelerisque
			quam efficitur. Vestibulum id mauris non lorem faucibus semper nec non tortor. Nam purus
			dolor, sagittis tempus pulvinar sed, consectetur at velit. Sed mattis hendrerit imperdiet.
			Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
			Sed interdum nunc quis libero malesuada rhoncus.
		</p>
		<hr />

		<section>
			<a class="btn variant-filled-primary" href="https://kit.svelte.dev/" target="_blank"
				>SvelteKit</a
			>
			<a class="btn variant-filled-secondary" href="https://tailwindcss.com/" target="_blank"
				>Tailwind</a
			>
			<a class="btn variant-filled-tertiary" href="https://github.com/" target="_blank">GitHub</a>
		</section>
		<hr />
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate nostrum, vero explicabo
			sunt ipsum asperiores. Molestias nostrum mollitia cumque veniam eum error atque, dolores
			nesciunt voluptas ea consectetur sed delectus.
		</p>
		<span
			class="inline-flex items-center rounded-md bg-gray-500 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
			>Badge</span
		>
		<span
			class="inline-flex items-center rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
			>Badge</span
		>
		<span
			class="inline-flex items-center rounded-md bg-yellow-500 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
			>Badge</span
		>
		<span
			class="inline-flex items-center rounded-md bg-green-500 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
			>Badge</span
		>
		<span
			class="inline-flex items-center rounded-md bg-blue-500 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
			>Badge</span
		>
		<span
			class="inline-flex items-center rounded-md bg-indigo-500 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
			>Badge</span
		>
		<span
			class="inline-flex items-center rounded-md bg-purple-500 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10"
			>Badge</span
		>
		<span
			class="inline-flex items-center rounded-md bg-pink-500 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10"
			>Badge</span
		>
	</div>
</main>
