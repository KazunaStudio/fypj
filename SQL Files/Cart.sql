/*Create a table for Cart*/
create table Cart(
CartId int identity(1,1),
BuyerId int,
Buyername varchar (500),
SellerName varchar(500),
PId int,
PName varchar (500),
PAmt int,
PImg varchar(500),
)

/*Create procedure to select all information of Cart*/
create procedure CartInfo as begin select * from dbo.Cart end

/*Create procedure to Add a row in the table*/
Create procedure Addproduct (
@BuyerId int,
@Buyername varchar (500),
@SellerName varchar(500),
@PId int,
@PName varchar (500),
@PAmt int,
@PImg varchar(500)
)

as begin insert into dbo.Cart (BuyerId,Buyername,SellerName,PId,PName,PAmt,PImg) values 
(@BuyerId,@Buyername,@SellerName,@PId,@PName,@PAmt,@PImg) end

/*Create procedure to delete all rows in the table (Once users paided)*/
Create procedure DeleteCart as begin Truncate table dbo.Cart end