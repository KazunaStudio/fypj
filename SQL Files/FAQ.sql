/*Create a table for FAQ*/
create table dbo.FAQ(
FAQId int identity(1,1),
Question varchar(2000),
Answers varchar(5000),
)

/*Pre-inserting data into table*/
insert into dbo.FAQ values(
'Where to drop my spectacle','There are multiple places where you can drop off your glasses. Currently, there are 5 stores that you can donate to:  1. Specs-Ifying (Gillman Village 7 Lock Road S108935, Opening Hours: 10 am-6 pm) 2. Specs ( Highgate 68 Toh Tuck Road S596733, Opening Hours: 11 am-7 pm) 3. OWNDAYS( 53 Ang Mo Kio Ave 3, #B1-05/06, AMK Hub S569933, Opening Hours: 11 am -10 pm) 4. Spectacle Hut (53 Ang Mo Kio Avenue 3, #01-23, AMK Hub S569933, Opening Hours: 10 am–10 pm) 5. Ace Optical Group ( Blk 449 Ang Mo Kio Ave 10, #01-1731 S560449, Opening Hours: 9.30 am–7 pm)  Please check out the charity section for more details.')
insert into dbo.FAQ values(
'How to donate?','Step 1: Take note of your spectacle condition, check that your spectacle is in good condition. (Damage, broken etc. spectacle are not accepted) Step 2: Visit your nearest participating stores to drop off your spectacle. Step 3: Collect your lucky draw ticket once you drop off your spectacle, the ticket would consist of a number. Step 4: Wait for our announcement at the end of the month to see if you are one of the lucky winners to walk away with a prize!  For more information, please check out the charity section.')
insert into dbo.FAQ values(
'How long will it take to get my order?','You will be able to get your orders within the day itself to 4 days at best. Due to the pandemic, there may be a delay in delivery.')
insert into dbo.FAQ values(
'How can I track my orders?','The tracking details will be sent to your email. Please check your inbox or spam mail.')

/*Create procedure to select all information of FAQ*/
create procedure AllFAQ as begin select * from dbo.FAQ end

/*Create procedure to Add a row in the table*/
Create procedure AddFAQ (@Question varchar(2000),
@Answers varchar(5000))
as begin insert into dbo.FAQ (Question,Answers) values (@Question,@Answers) end

/*Create procedure to update a row in the table*/
Create procedure updateFAQ (@FAQId int,@Question varchar(500),@Answers varchar(5000))
as begin update dbo.FAQ set Question=@Question, Answers=@Answers where FAQId=@FAQId end

/*Create procedure to delete a row in the table*/
Create procedure DeleteFAQ(@FAQId int) as begin delete from dbo.FAQ where FAQId=@FAQId end