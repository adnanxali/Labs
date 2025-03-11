import { useState } from "react";


export const Third = () => {
    const [copied, setCopied] = useState(false);

    const lexCode = `calc.l:
%{
#include "y.tab.h"
%}

%%

[0-9]+      { yylval = atoi(yytext); return NUMBER; }
[+\-*/()]   { return yytext[0]; }
[\n]        { return '\n'; }
[ \t]       ; /* Ignore spaces */
.           { printf("Invalid: %s\n", yytext); }

%%

int yywrap() { return 1; }

calc.y:
%{
#include <stdio.h>
#include <stdlib.h>
int yylex();
void yyerror(const char *s) { printf("Error: %s\n", s); }
%}

%token NUMBER

%%

calc:   /* empty */
    | calc expr '\n' { printf("Result: %d\n", $2); }
    ;

expr:   expr '+' expr { $$ = $1 + $3; }
    |   expr '-' expr { $$ = $1 - $3; }
    |   expr '*' expr { $$ = $1 * $3; }
    |   expr '/' expr { $$ = $1 / $3; }
    |   '(' expr ')'  { $$ = $2; }
    |   NUMBER        { $$ = $1; }
    ;

%%

int main() { return yyparse(); }

bison -d calc.y
flex calc.l
gcc lex.yy.c calc.tab.c -o calc
./calc`;

  
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
        </div>
        
    );
};
