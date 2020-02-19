#include <iostream>
#include <Windows.h>

int main()
{
	const char* result = "Result : ";
	const char* same = "The value of eax and ebx is the same!\n";
	const char* different = "The value of eax and ebx is different!\n";

	int integer_1 = 1;
	int integer_2 = 2;

	__asm
	{
		xor eax, eax
		mov eax, result
		push eax
		call printf
		pop eax

		xor eax, eax
		xor eax, eax
		mov eax, integer_1
		mov ebx, integer_2

		cmp eax, ebx
		jnz loc_different

		xor eax, eax
		mov eax, same
		push eax
		call printf
		pop eax

		jmp skip_loc_different

		loc_different :
			xor eax, eax
			mov eax, different
			push eax
			call printf
			pop eax

		skip_loc_different :
	}
  
	system("PAUSE");
	return 0;
}
