<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Load PHPMailer

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $fullname = strip_tags(trim($_POST["fullname"]));
	$fullname = str_replace(array("\r","\n"),array(" "," "),$fullname);
    $phone = strip_tags(trim($_POST["phone"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Check that data was sent to the mailer.
    if ( empty($fullname) OR empty($phone) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Set a 400 (bad request) response code and exit.
        http_response_code(400);
        echo "Oops! There was a problem with your submission. Please complete the form and try again.";
        exit;
    }

     // Update this to your desired email address.
     $recipient = "piyushgoswami.innovatix@gmail.com";
     $subject = "Message from $fullname";
    $mail = new PHPMailer(true);
    
    try {
        // SMTP server configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Use Gmail SMTP
        $mail->SMTPAuth = true;
        $mail->Username = 'piyushgoswami.innovatix@gmail.com'; // Your email
        $mail->Password = 'AFE705D547B89AD46403A2AF11D9BAF33F01'; // Your app password or generated password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Email settings
        $mail->setFrom('piyush2004', 'Piyush Goswami');
        $mail->addAddress($email);
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = nl2br($message); // Convert newlines to <br> tags for HTML

        // Send the email
        $mail->send();
        echo 'Email sent successfully!';
    } catch (Exception $e) {
        echo "Failed to send email. Error: {$mail->ErrorInfo}";
    }
}
?>
