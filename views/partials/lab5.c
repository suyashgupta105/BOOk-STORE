#include <stdio.h>
#include <string.h>
int A(char[], int, int);
int A_dashed(char[], int, int);
int A(char str[], int pos, int len)
{
 if (str[pos] == 'b' && (pos + 1) < len)
 {
 pos++;
 if (str[pos] == 'd')
 {
 if ((pos + 1) == len)
 return 1;
 else
 return A_dashed(str, pos + 1, len);
 }
 }
 return 0;
}
int A_dashed(char str[], int pos, int len)
{
 if (str[pos] == 'c')
 {
 if ((pos + 1) == len)
 return 1;
 else
 return A_dashed(str, pos + 1, len);
 }
 if (str[pos] == 'a' && (pos + 1) < len)
 {
 pos++;
 if (str[pos] == 'd')
 {
 if ((pos + 1) == len)
 return 1;
 else
 return A_dashed(str, pos + 1, len);
 }
 }
 return 0;
}
int main(int argc, char const *argv[])
{
 int n;
 printf("Enter the number of lines in grammar: ");
 scanf("%d", &n);
 char grammar[100][100];
 printf("Input the grammar:\n");
 for (int i = 0; i < n; i++)
 {
 scanf("%s", grammar[i]);
 }
 printf("Grammar:\n");
 for (int i = 0; i < n; i++)
 {
 printf("%s\n", grammar[i]);
 }
 char str[100] = "00";
 while (strcmp(str, "-") != 0)
 {
 printf("Enter the string to be checked against the grammar:\n");
 scanf("%s", str);
 (A(str, 0, strlen(str))) ? printf("The String is Accepted.\n") : printf("The String i
s Rejected.\n");
 }
 return 0;
}
