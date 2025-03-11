import { useState } from "react";


export const Sec = () => {
    const [copied, setCopied] = useState(false);

    const lexCode = `\
%{
#include <stdio.h>
%}

%%
[ \\t\\n]+       ;  // Ignore spaces, tabs, and newlines
"int"|"float"|"char"  { printf("Keyword: %s\\n", yytext); }
[a-zA-Z_][a-zA-Z0-9_]* { printf("Identifier: %s\\n", yytext); }
[0-9]+         { printf("Number: %s\\n", yytext); }
"."            { printf("Special Symbol: %s\\n", yytext); }
"=="|"="|"+"|"-"|"*"|"/"  { printf("Operator: %s\\n", yytext); }
.              { printf("Unknown Symbol: %s\\n", yytext); }
%%

int main() {
    yylex(); // Start tokenizing input
    return 0;
}

int yywrap() {
    return 1;
}`;

   const lexCode2= `2.

%{
#include <stdio.h>
%}

%%

[ \t\n]+                 ;  /* Ignore spaces, tabs, and newlines */
"int"|"float"|"char"      { printf("Keyword: %s\n", yytext); }
[a-zA-Z_][a-zA-Z0-9_]*    { printf("Identifier: %s\n", yytext); }
[0-9]+                   { printf("Number: %s\n", yytext); }
"=="|"="|"+"|"-"|"*"|"/"  { printf("Operator: %s\n", yytext); }
"."                      { printf("Special Symbol: %s\n", yytext); }
.                        { printf("Unknown Symbol: %s\n", yytext); }

%%

int main() {
    printf("Enter code: ");
    yylex();  // Start tokenizing input
    return 0;
}

int yywrap() { return 1; }`
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
                {/* Syntax Highlighter */}
                
                    {lexCode}
                

                {/* Copy Button */}
                <button 
                    onClick={copyToClipboard} 
                    className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>
            <div className="relative">
                {/* Syntax Highlighter */}
                
                    {lexCode2}
                

                {/* Copy Button */}
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
