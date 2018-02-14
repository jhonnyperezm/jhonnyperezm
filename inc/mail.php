<?php
	require("PHPMailerAutoload.php");
	try{
		$mail = new PHPMailer();
		$mail->IsSMTP();
		$mail->SMTPDebug = 0;
		$mail->SMTPAuth = TRUE;
		$mail->SMTPSecure = "ssl";
		$mail->Port     = 465;
		$mail->Username = "no-reply@tudominio";
		$mail->Password = "TUPASSWORD";
		$mail->Host     = "TU HOST";
		$mail->Mailer   = "smtp";
		$mail->SetFrom("no-reply@tudominio", "Contacto FROM DGARCIA");
  
		$mail->AddAddress("antauri285@gmail.com");
		$mensaje   = 'Nombre: '.$_POST['nombre'].'<br>'.
					'Email: '.$_POST['email'].'<br>'.
				'Comentarios: '.$_POST['comentarios'];
		$mail->isHTML(true);  
	    $mail->Subject = 'Nuevo Contacto';
	    $mail->Body    = $mensaje;

	    if($mail->Send()){
	    	$result = true;
	    	$message = 'Mensaje enviado exitosamente.';
	    }else{
	    	$result = false;
	    	$message = 'Ocurrió un error.';
	    }
	    $response = Array("Result" => $result,
							"Message" => $message);
		echo json_encode($response);	
	}catch(Exception $ex){
		$response = Array("Result" => false,
						"Message" => 'ERROR');
		echo json_encode($response);
	}	
?>