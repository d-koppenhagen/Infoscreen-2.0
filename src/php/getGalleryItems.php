<?php
//$request_body = file_get_contents('php://input');
//$data = json_decode($request_body);
//echo '<script>alert("'.$testvar.'")</script>';

$startpath = "../img/gallery";

function get_dir_iterative($dir = '../img/gallery', $exclude = array( 'cgi-bin', '.', '..' ))
{
    $exclude = array_flip($exclude);
    if(!is_dir($dir))
    {
        return;
    }

    $dh = opendir($dir);

    if(!$dh)
    {
        return;
    }

    $stack = array($dh);
    $level = 0;

    while(count($stack))
    {
        if(false !== ( $file = readdir( $stack[0] ) ) )
        {
            if(!isset($exclude[$file]))
            {
                if(is_dir($dir . '/' . $file))
                {
                    $dh = opendir($file . '/' . $dir);
                    if($dh)
                    {
                        array_unshift($stack, $dh);
                        ++$level;
                    }
                }
                else
                {

                }
            }
        }
        else
        {
            closedir(array_shift($stack));
            --$level;
        }
    }
    echo json_encode($stack);
}
get_dir_iterative();

?>
