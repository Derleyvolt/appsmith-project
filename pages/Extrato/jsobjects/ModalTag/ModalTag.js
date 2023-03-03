export default {
	EditTag: async () => {
			//const tags = Table1.tableData[Table1.triggeredRowIndex].Tag.toString().split(',')
		  const tags = appsmith.store.tags;
			await showAlert(tags.length.toString());
			await storeValue('loadModalTags', tags);
			
			const multiSelectList = [];
			
			for(var e of tags) {
					console.log(e);
					multiSelectList.push({'label' : e.descricao, 'value' : e.descricao});
			}
		
			await storeValue('multiSelectList', tags);
			await storeValue('lastSelectedRow', Table1.selectedRowIndex);
			await showModal('Modal1');
	},
	
	MultiSelectTags: async () => {
			const idx = Table1.triggeredRowIndex;
			
			if(Boolean(Table1.updatedRow.id_projeto)) {
					Table1.tableData[idx] = Table1.updatedRow;
			}
		
			Table1.tableData[idx].Tag = MultiSelect1.selectedOptionLabels.join();
			
			await storeValue('updateIndex',  Array(1).fill(idx));
		
			//appsmith.store.updateIndex = Array(1).fill(idx);
		
			await storeValue('extrato', Table1.tableData);
			//Table1.updatedRowIndices = Array(1).fill(idx);
			await closeModal('Modal1');
	}
}