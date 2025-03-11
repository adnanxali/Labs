import { useState } from "react";


export const Fifith = () => {
    const [copied, setCopied] = useState(false);

    const lexCode = `#include <stdio.h>
#include <ctype.h>
#include <string.h>

#define MAX 10

char grammar[MAX][MAX];  
char first[MAX][MAX];    
char follow[MAX][MAX];   
int rule_count;          

void addToSet(char set[], char value) {
    if (strchr(set, value) == NULL) {
        int len = strlen(set);
        set[len] = value;
        set[len + 1] = '\0';
    }
}

void findFirst(char symbol, char result[]) {
    if (!isupper(symbol)) { 
        addToSet(result, symbol);
        return;
    }
    
    for (int i = 0; i < rule_count; i++) {
        if (grammar[i][0] == symbol) {
            if (!isupper(grammar[i][2])) { 
                addToSet(result, grammar[i][2]);
            } else {
                findFirst(grammar[i][2], result);
            }
        }
    }
}

void findFollow(char symbol, char result[]) {
    if (grammar[0][0] == symbol) {
        addToSet(result, '$');  
    }

    for (int i = 0; i < rule_count; i++) {
        for (int j = 2; grammar[i][j] != '\0'; j++) {
            if (grammar[i][j] == symbol) {
                if (grammar[i][j+1] != '\0') {
                    findFirst(grammar[i][j+1], result);
                } else {
                    findFollow(grammar[i][0], result);
                }
            }
        }
    }
}

void computeFirstFollow() {
    for (int i = 0; i < rule_count; i++) {
        findFirst(grammar[i][0], first[grammar[i][0]]);
        findFollow(grammar[i][0], follow[grammar[i][0]]);
    }
}

void printSets() {
    printf("\nFirst and Follow Sets:\n");
    for (int i = 0; i < rule_count; i++) {
        printf("First(%c) = { %s }\n", grammar[i][0], first[grammar[i][0]]);
        printf("Follow(%c) = { %s }\n", grammar[i][0], follow[grammar[i][0]]);
    }
}

int main() {
    printf("Enter number of rules: ");
    scanf("%d", &rule_count);

    printf("Enter grammar rules (e.g., S=A, A=a):\n");
    for (int i = 0; i < rule_count; i++) {
        scanf("%s", grammar[i]);
    }

    computeFirstFollow();
    printSets();

    return 0;
}`;

  
    const copyToClipboard = () => {
        navigator.clipboard.writeText(lexCode)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); 
            })
            .catch(err => console.error("Failed to copy:", err));
    };

    return (
        <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-2">Lex Code</h2>
            
            <div className="relative">
              
                
                    {lexCode}
                

              
                <button 
                    onClick={copyToClipboard} 
                    className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>
        </div>
        
    );
};
