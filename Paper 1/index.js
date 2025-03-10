const { GoogleSpreadsheet } = require('google-spreadsheet')
const { JWT } = require('google-auth-library')

function generateArray(len = 100) {
    return Array.from({ length: len }, () => Math.floor(Math.random() * len))
}

function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i]
        let j = i - 1
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j]
            j = j - 1
        }
        arr[j + 1] = key
    }
}
function selectionSort(array) {

}
function mergeSort(array) {

}
function quickSort(array) {

}
function checkSorted(arr) {
    for (let i = 1; i < arr.length; i++){
        if(arr[i] < arr[i-1]){
            return false;
        }
    }
    return true
}

function runTests(n) {
    var a1 = generateArray(n)
    var a2 = a1.slice()
    var a3 = a1.slice()
    var a4 = a1.slice()

    insertionSort(a1)
    checkSorted(a1)

    selectionSort(a2)
    checkSorted(a1)

    mergeSort(a3)
    checkSorted(a1)

    quickSort(a4)
    checkSorted(a1)
}

function main() {

}

main()