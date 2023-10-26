<script>
    import { Table } from '@skeletonlabs/skeleton';
    import { tableMapperValues } from '@skeletonlabs/skeleton';

    const sourceData = [
        { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
        { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
        { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
        { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
        { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    ];
    
    const tableSimple = {
        head: ['Name', 'Symbol', 'Weight'],
        body: tableMapperValues(sourceData, ['name', 'symbol', 'weight']),
        meta: tableMapperValues(sourceData, ['position', 'name', 'symbol', 'weight']),
        foot: ['Total', '', '<code class="code">5</code>']
    };

                    
</script>
<div class="container mx-auto p-8 space-y-8">
    <h1>Blog</h1>
    <Table source={tableSimple} interactive={true} />
</div>