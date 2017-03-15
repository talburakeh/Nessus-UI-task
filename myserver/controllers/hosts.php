

<?php
include($_SERVER['DOCUMENT_ROOT'].'/myserver/models/functions.php');

if ( isset($_POST['host']) &&  $_POST['host'] > 0) {
	$totalHosts = $_POST['host'];
} else {
	$totalHosts = 1;
}

$start = $_POST['counter'];

defaultjson($totalHosts, $start);
?>
