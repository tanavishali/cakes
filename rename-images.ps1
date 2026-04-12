$folders = @('baby-cake', 'boys cakes', 'deals-2200', 'nikha-cake')
foreach ($folder in $folders) {
    $path = Join-Path 'b:\cakes\cakes\public' $folder
    $files = Get-ChildItem $path -Filter '*.jpeg' | Sort-Object Name
    $i = 1
    foreach ($file in $files) {
        $prefix = $folder -replace ' ','-' -replace '--','-'
        $newName = "$prefix-$i.jpeg"
        Rename-Item $file.FullName -NewName $newName
        $i++
    }
}
