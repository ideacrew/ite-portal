cd dist/apps/ite-portal
aws s3 sync --acl public-read . s3://portal-dbh-ite-com/ --delete
invalidationId=`AWS_MAX_ATTEMPTS=999 aws cloudfront create-invalidation --distribution-id E3GAT3Q8T2PNVR --output text --query 'Invalidation.Id' --paths '/*'`
aws cloudfront wait invalidation-completed --distribution-id E3GAT3Q8T2PNVR --id ${invalidationId}
