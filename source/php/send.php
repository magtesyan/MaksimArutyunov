<?php
  if (isset($_POST['name'])) {$phone = $_POST['name'];}
  if (isset($_POST['phone'])) {$name = $_POST['phone'];}
  
  $myaddres  = "magtesyan@inbox.ru";
  $mes = "Тема: Заказ обратного звонка!\nТелефон: $phone\nИмя: $name";
  $sub='Заказ обратного звонка ведущего';
  $email='Заказ обратного звонка';
  $headers='From: info@maksimarutyunov.ru';
  $send = mail ($myaddres,$sub,$mes,$headers);
  
  ini_set('short_open_tag', 'On');
?>