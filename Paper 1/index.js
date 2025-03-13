const { GoogleSpreadsheet } = require('google-spreadsheet')
const { JWT } = require('google-auth-library')

const keys = require("../../key.json")
const serviceAccountAuth = new JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
})
const doc = new GoogleSpreadsheet('1xIHzhsxO7qM2iLxzh6rhyiLmLH_YJc1vPn3-GecmK5E', serviceAccountAuth)


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
function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let next = i

        for (let j = i; j < arr.length; j++) {
            if (arr[j] < arr[next]) {
                next = j
            }
        }

        let tmp = arr[i]
        arr[i] = arr[next]
        arr[next] = tmp
    }
}

function mergeSort(arr) {
    const mid = Math.floor(arr.length / 2)
    if (arr.length < 2) return arr
    const left = arr.splice(0, mid)

    return merge(mergeSort(left), mergeSort(arr))

}
function merge(left, right) {
    let arr = []
    while (left.length > 0 && right.length > 0) {
        if (left[0] > right[0]) { arr.push(right.shift()) }
        else { arr.push(left.shift()) }
    }

    return [...arr, ...left, ...right] // Spread syntax, appends remainder of either array if not empty

}

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    let pivot = arr[Math.floor(Math.random() * arr.length)];
    let left = [];
    let right = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];

}
function checkSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true
}

function runTests(n = 100) {
    let start, end;
    let insertion, selection, merge, quick
    var initialArray = generateArray(n)
    var a1 = initialArray.slice()
    var a2 = initialArray.slice()
    var a3 = initialArray.slice()
    var a4 = initialArray.slice()

    start = performance.now()
    insertionSort(a1)
    end = performance.now()
    insertion = end - start

    start = performance.now()
    selectionSort(a2)
    end = performance.now()
    selection = end - start

    start = performance.now()
    a3 = mergeSort(a3)
    end = performance.now()
    merge = end - start

    start = performance.now()
    a4 = quickSort(a4)
    end = performance.now()
    quick = end - start

    if (checkSorted(a1) && checkSorted(a2) && checkSorted(a3) && checkSorted(a4)) {
        return [insertion, selection, merge, quick, initialArray]
    } else {
        return [-1, -1, -1, -1]
    }

}

async function main() {
    await doc.loadInfo()
    console.log(doc.title)
    const insertionSheet = doc.sheetsByIndex[0]
    const selectionSheet = doc.sheetsByIndex[1]
    const mergeSheet = doc.sheetsByIndex[2]
    const quickSheet = doc.sheetsByIndex[3]

    let avg_data = { 100: [], 1000: [], 10000: [] }
    let testCases = [100, 250, 500, 1000, 2500, 5000, 10000, 15000, 25000, 50000]

    for (let i = 0; i < testCases.length; i++) {
        console.log(`Starting ${testCases[i]} trials...`)
        let sum_data = [0, 0, 0, 0]
        let j = 0
        for (j = 0; j < 100; j++) {
            // Resulting data is formatted as [Insertion, Selection, Merge, Quick]
            raw_data = runTests(testCases[i])
            if (raw_data[0] == -1) {
                console.log("Sorting Invalid, exiting...")
                return
            }
            sum_data[0] += (raw_data[0] / 100)
            sum_data[1] += (raw_data[1] / 100)
            sum_data[2] += (raw_data[2] / 100)
            sum_data[3] += (raw_data[3] / 100)

        }
        await insertionSheet.addRow([testCases[i], sum_data[0], j])
        await selectionSheet.addRow([testCases[i], sum_data[1], j])
        await mergeSheet.addRow([testCases[i], sum_data[2], j])
        await quickSheet.addRow([testCases[i], sum_data[3], j])
        avg_data[testCases[i]] = sum_data
    }
    console.log(avg_data)
}

main()