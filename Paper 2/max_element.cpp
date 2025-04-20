#include <chrono>
#include <iostream>
#include <vector>

#define MAX_SIZE 16384
#define MAX_ELEMENT 32768
using namespace std;

int getMaxArray(int arr[]);
int getMaxVector(vector<int> &arr);
int getMaxArraySingle(int arr[]);
int getMaxVectorSingle(vector<int> &arr);

int main() {
    int arr1[MAX_SIZE];
    vector<int> arr2(MAX_SIZE);

    int arr3[MAX_SIZE];
    vector<int> arr4(MAX_SIZE);

    // Initialize Arrays, both length 32
    for (int i = 0; i < MAX_SIZE; i++) {
        int num = rand() % MAX_ELEMENT;
        arr1[i] = num;
        arr2[i] = num;
        arr3[i] = num;
        arr4[i] = num;
    }

    auto beg = chrono::high_resolution_clock::now();
    int res = getMaxArray(arr1);
    auto end = chrono::high_resolution_clock::now();
    auto duration = chrono::duration_cast<chrono::nanoseconds>(end - beg);
    cout << "Array Largest Element: " << res << endl;
    cout << "Array Elapsed Time: " << duration.count() << " ns\n" << endl;

    beg = chrono::high_resolution_clock::now();
    res = getMaxVector(arr2);
    end = chrono::high_resolution_clock::now();
    duration = chrono::duration_cast<chrono::nanoseconds>(end - beg);
    cout << "Vector Largest Element: " << res << endl;
    cout << "Vector Elapsed Time: " << duration.count() << " ns\n" << endl;

    beg = chrono::high_resolution_clock::now();
    res = getMaxArraySingle(arr3);
    end = chrono::high_resolution_clock::now();
    duration = chrono::duration_cast<chrono::nanoseconds>(end - beg);
    cout << "Array Largest Element: " << res << endl;
    cout << "Array Single Pass Elapsed Time: " << duration.count() << " ns\n" << endl;

    beg = chrono::high_resolution_clock::now();
    res = getMaxVectorSingle(arr4);
    end = chrono::high_resolution_clock::now();
    duration = chrono::duration_cast<chrono::nanoseconds>(end - beg);
    cout << "Vector Largest Element: " << res << endl;
    cout << "Vector Single Pass Elapsed Time: " << duration.count() << " ns\n" << endl;

    return 0;
}

int getMaxArraySingle(int arr[]) {
    int largest = arr[0];
    for(int i = 1; i < MAX_SIZE; i++){
        if(arr[i] > largest)
            largest = arr[i];
    }
    return largest;
}

int getMaxVectorSingle(vector<int> &arr) {
    int largest = arr[0];
    for(int i = 1; i < MAX_SIZE; i++){
        if(arr[i] > largest)
            largest = arr[i];
    }
    return largest;
}

// Compare i with i + MAX_SIZE/2
// if i + MAX_SIZE/2 is larger, swap
// largest elements of array should be in first half
// repeat

int getMaxArray(int arr[]) {
    int size = MAX_SIZE;
    while (size > 1) {
        for (int i = 0; i < size / 2; i++) {
            if (arr[i + size / 2] > arr[i]) {
                arr[i] = arr[i + size / 2];
            }
        }
        size = size / 2;
    }

    return arr[0];
}

int getMaxVector(vector<int> &arr) {
    int size = MAX_SIZE;
    while (size > 1) {
        for (int i = 0; i < size / 2; i++) {
            if (arr[i + size / 2] > arr[i]) {
                arr[i] = arr[i + size / 2];
            }
        }
        size = size / 2;
    }

    return arr.at(0);
}