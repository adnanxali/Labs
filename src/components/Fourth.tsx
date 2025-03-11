import { useState } from "react";


export const Fourth = () => {
    const [copied, setCopied] = useState(false);

    const lexCode = `#include<iostream>
#include<vector>
#include<map>
#include<string>
using namespace std;

void eliminateLeftRecursion(map<string, vector<string>> & grammer){
    map<string, vector<string>> ng;
    for(auto  & curr : grammer){
        string A = curr.first;
        vector<string> alpha;
        vector<string> beta;
        for(string & prod : curr.second){
            if(string(1, prod[0])==A){
                beta.push_back(prod.substr(1));
            }
            else{
                alpha.push_back(prod);
            }
        }
        
        if(!beta.empty()){
            string A_prime = A + '\'';
            for(string & prod : alpha){
                prod += A_prime;
            }
            ng[A] = alpha;
            beta.push_back("#");
            ng[A_prime] = beta;
        }
    }
    grammer = ng;
}

string common(string a, string b){
    int i = 0; 
    while(i<a.size() && i<b.size() and a[i]==b[i]){
        i++;
    }
    return a.substr(0, i);
}

void leftFactoring(map<string, vector<string>> & grammer){
    map<string, vector<string>> newGrammer;
    
    for(auto & curr : grammer){
        string nonTerminal = curr.first;
        vector<string> productions = curr.second;
        string commonPrefix = "";
        
        for(int i = 0; i<productions.size(); i++){
            for(int j = i+1; j<productions.size(); j++){
                string prefix = common(productions[i], productions[j]);
                if(prefix.size() > commonPrefix.size()){
                    commonPrefix = prefix;
                }
            }
        }
        
        if(!commonPrefix.empty()){
            string newNonTerminal = nonTerminal + "'";
            vector<string> newProductions;
            vector<string> extraProductions;
            
            for(string & prod : productions){
                if(prod.substr(0, commonPrefix.size())==commonPrefix){
                    newProductions.push_back(prod.substr(commonPrefix.size()));
                }
                else{
                    extraProductions.push_back(prod);
                }
            }
            newGrammer[nonTerminal] = {commonPrefix + newNonTerminal};
            for(string prod : extraProductions){
                newGrammer[nonTerminal].push_back(prod);
            }
            newGrammer[newNonTerminal] = newProductions;
        }
        else{
            newGrammer[nonTerminal] = productions;
        }
    }
    grammer = newGrammer;
}

void print(map<string, vector<string>> & grammer){
    for(auto curr : grammer){
        cout<<curr.first<<" -> ";
        for(int i = 0; i<curr.second.size(); i++){
            cout<<curr.second[i];
            if(i<curr.second.size()-1){
                cout<<" | ";
            }
        }
        cout<<endl;
    }
}

int main(){
    string nt;
    int n;
    map<string, vector<string>> grammer;
    cout<<"Enter the non teminal: ";
    cin>>nt;
    cout<<"Enter the no of productions: ";
    cin>>n;
    cin.ignore();
    
    for(int i = 0; i<n; i++){
        string prod;
        getline(cin, prod);
        grammer[nt].push_back(prod);
    }
    
    eliminateLeftRecursion(grammer);
    leftFactoring(grammer);
    print(grammer);
    
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
