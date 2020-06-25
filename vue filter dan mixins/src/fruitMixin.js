export const fruitMixin = {
    data() {
        return {
            fruits: ['Apple', 'Banana', 'Mango', 'Melon'],
            filterText: ''
        }
    },
    computed: {
        filterFruits() {
            return this.fruits.filter((element) => {
                return element.match(this.filterText)
            })
        }
    },
    created() {
        console.log('Created Hook in fruitmixin.js')
    },
}


// jika terdapat perubahan data pada 1 buah komponen maka komponen lain yang dibagikan oleh mixin tidak akan menerima perubahan