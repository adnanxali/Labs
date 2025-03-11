import { useState } from "react";


export const Six = () => {
    const [copied, setCopied] = useState(false);

    const lexCode = `6.

#include <bits/stdc++.h>
using namespace std; 

int z = 0, i = 0, j = 0, c = 0; 
char a[50], ac[20], stk[50], act[10];  

void check() { 
    strcpy(ac, "REDUCE TO E -> ");   
      
    for(z = 0; z < c; z++) { 
        if(stk[z] == '4') { 
            printf("%s4", ac); 
            stk[z] = 'E'; 
            stk[z + 1] = '\0'; 
            printf("\n$%s\t%s$\t", stk, a);  
        } 
    } 
          
    for(z = 0; z < c - 2; z++) { 
        if(stk[z] == '2' && stk[z + 1] == 'E' && stk[z + 2] == '2') { 
            printf("%s2E2", ac); 
            stk[z] = 'E'; 
            stk[z + 1] = '\0'; 
            stk[z + 2] = '\0'; 
            printf("\n$%s\t%s$\t", stk, a); 
            i -= 2; 
        } 
    } 
          
    for(z = 0; z < c - 2; z++) { 
        if(stk[z] == '3' && stk[z + 1] == 'E' && stk[z + 2] == '3') { 
            printf("%s3E3", ac); 
            stk[z] = 'E'; 
            stk[z + 1] = '\0'; 
            stk[z + 2] = '\0'; 
            printf("\n$%s\t%s$\t", stk, a); 
            i -= 2; 
        } 
    } 
} 

int main() { 
    printf("GRAMMAR:\nE->2E2 \nE->3E3 \nE->4\n");     
      
    printf("Enter input string: ");
    cin >> a;
      
    c = strlen(a);  
    strcpy(act, "SHIFT");  
      
    printf("\nstack \t input \t action");  
    printf("\n$\t%s$\t", a);  
      
    for(i = 0; j < c; i++, j++) { 
        printf("%s", act);  
        stk[i] = a[j];      
        stk[i + 1] = '\0'; 
        a[j] = ' '; 
        printf("\n$%s\t%s$\t", stk, a);  
        check();  
    } 
      
    check();  
      
    if(stk[0] == 'E' && stk[1] == '\0')  
        printf("Accept\n"); 
    else  
        printf("Reject\n"); 
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
