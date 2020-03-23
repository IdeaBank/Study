#include <stdio.h>

int main()
{
	int a = 1;
	int* ptr_ = &a;
	
	const char* point = "%p %p";

	__asm
	{
		xor eax, eax
		xor ebx, ebx
		xor ecx, ecx

		mov ecx, ptr_
		mov eax, [ecx]
		mov ebx, a

		push eax
		push ebx
		push point

		call printf

		pop point
		pop ebx
		pop eax
	}

	return 0;
}