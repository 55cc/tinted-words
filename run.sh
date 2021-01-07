#!/bin/bash

# qjs build.js
# qjs example.js
str="_____________________\nsetmap:生成词库\t example:运行样例\t test:测试fs\t "
arr=("setmap.js" "example.js" "test.js");
i=1;
len=$[1+${#arr[*]}];
str="$str\n选择文件:\n      ";
while [ $i -lt  $len ]
do
    str="$str$i.${arr[$i-1]}  "
    let i++
done
str="$str$i.exit  "

active=1;
while [ $active -lt  $len ]
do
    
    echo -e "$str"
    # echo "***************"
    read active
    if [ $active -lt  $len ]; then
        # echo -e "run ${arr[$active-1]}\n"
        clear
        echo -e "run ${arr[$active-1]}:\n"
        qjs "${arr[$active-1]}"
        echo -e "run end\n\n"
    fi
done